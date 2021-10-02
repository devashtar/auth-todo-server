import { getCustomRepository } from "typeorm";
import { TokenRepository } from '../repositories/token.repository';
import { TokenLimitExeption } from "../exceptions/user.exeption";

const maxLimitTokens = Number(process.env.MAX_LIMIT_TOKENS || 5);

export default async function(userId: string):Promise<void> {
    try {
        const tokenRepo = getCustomRepository(TokenRepository); // db => tableToken
        const quantityTokens = await tokenRepo.getQuantityTokens(userId);
        
        if (quantityTokens >= maxLimitTokens) {
            await tokenRepo.removeTokenByUserId(userId)    // delete all tokens of current user by userId
            throw new TokenLimitExeption('The maximum allowed number of tokens has been exceeded!');
        }

        return;
    } catch(e) {
        throw e;
    }
}