import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { TokenRepository } from '../repositories/token.repository';
import { User } from '../entity/User';
import { Token } from '../entity/Token';
import toHashPassword from '../support-functions/to.hash.password';
import genTokens from '../support-functions/gen.tokens';
import decodeToken from '../support-functions/decode.token';
import tokenValidator from '../validators/token.validator';
import comparePasswords from '../validators/compare.passwords';
import userValidate from '../validators/user.validate';
import checkLimitTokens from '../validators/check.limit.tokens';
import { InvalidUserAccount, СheckFreeEmail } from '../exceptions/user.exeption';
import { IUser, IRefreshTokenObj, IAuthObj } from '../types/types';

const expiresAccessToken = Number(process.env.EXPIRES_ACCESS_TOKEN || 1800000);     // by default 30 min
const expiresRefreshToken = Number(process.env.EXPIRES_REFRESH_TOKEN || 432000000); // by default 5 days
// На клиент отдаём срок действия токенов в милисекундах, без учета текущего timestamp, так как время на клиенте и сервере может быть разное.

class UserService {

    async reg(userData: object | undefined):Promise<void> {
        try {
            const userObj = userValidate(userData);
            const repo = getCustomRepository(UserRepository);

            const result = await repo.checkFreeEmail(userObj.email);
            if (result) throw new СheckFreeEmail('Пользователь с данным email уже зарегистрирован!');
            
            const passwordHash = await toHashPassword(userObj.password);

            const user = new User();
            user.email = userObj.email;
            user.password = passwordHash;

            await repo.createAndSave(user);
        } catch(e) {
            throw e;
        }
    }

    async auth(userData: IUser | undefined, client_print_hash: string):Promise<IAuthObj> {
        try {
            const userFromClient = userValidate(userData);             // check user data from client
            const userRepo = getCustomRepository(UserRepository);   // db => tableUser
            const tokenRepo = getCustomRepository(TokenRepository); // db => tableToken

            const userFromDB = await userRepo.findUser(userFromClient.email);  // {id, email, password, role}

            if (!userFromDB) throw new InvalidUserAccount('Invalid login or password!');
            await comparePasswords(userFromClient.password, userFromDB.password); // throws error in case inavalid
            await checkLimitTokens(userFromDB.id); // throws error in case of exceeding the limit

            const token = new Token();
            token.expires_on = Date.now() + expiresRefreshToken; // by default 5 days
            token.client_print_hash = client_print_hash;
            token.user_id = userFromDB.id;

            await tokenRepo.createToken(token);

            const { accessToken, refreshToken } = genTokens(token.id, userFromDB.role);
            
            return {accessToken, refreshToken, userId: userFromDB.id, expiresAccessToken };
            
        } catch(e) { 
            throw e;
        }
    }

    async refreshToken(refreshTokenFromClient: any):Promise<IRefreshTokenObj> {
        try {
            const { tokenId, role } = tokenValidator(refreshTokenFromClient);

            const tokenRepo = getCustomRepository(TokenRepository); // db => tableToken

            const { accessToken, refreshToken } = genTokens(tokenId, role);

            await tokenRepo.updateToken(tokenId, Date.now() + expiresRefreshToken);

            return {accessToken, refreshToken, expiresAccessToken };
        } catch(e) {
            throw e;
        }
    }

    async logout(authorization: string) {
        try {
            const { tokenId } = decodeToken(authorization);
            
            const tokenRepo = getCustomRepository(TokenRepository); // db => tableToken

            await tokenRepo.removeTokenById(tokenId);
            return;
        } catch(e) {
            throw e;
        }
    }
}

export default new UserService();