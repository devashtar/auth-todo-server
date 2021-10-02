import jwt from 'jsonwebtoken';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { getCustomRepository } from "typeorm";
import { TokenRepository } from "../repositories/token.repository";
import { CheckAuthHeader, InvalidTokenExeption } from '../exceptions/user.exeption';
import { IJWTData } from '../types/types';

interface customJwtPayload extends JwtPayload {
    data: IJWTData
}

export default function tokenValidator(token: string | undefined):IJWTData {
    let id = null;
    try {
        if (typeof token === 'string') {

            const { data } = jwt_decode<customJwtPayload>(token);

            if (typeof data === 'object') {

                if (typeof data.tokenId === 'string' && typeof data.role === 'string') {
                    id = data.tokenId;
                    jwt.verify(token, String(process.env.TOKEN_KEY));
                    return data;
                }
            } else {
                throw new CheckAuthHeader('Unauthorized user!');
            }

        }

        throw new CheckAuthHeader('Unauthorized user!');
  
    } catch(e) {
        if (typeof id === 'string') {
            const tokenRepo = getCustomRepository(TokenRepository); // db => tableToken
            tokenRepo.removeTokenById(id);  // delete token with current id
        }
        if (e instanceof Error) {
            if (e.name === 'JsonWebTokenError') {
                throw new InvalidTokenExeption('Invalid token!')
            }
        }
        throw e;
    }
}