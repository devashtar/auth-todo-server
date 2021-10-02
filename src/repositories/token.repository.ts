import { AbstractRepository, EntityRepository } from "typeorm";
import { Token } from "../entity/Token";
import { InvalidTokenExeption } from "../exceptions/user.exeption";

@EntityRepository(Token)
export class TokenRepository extends AbstractRepository<Token> {
    async createToken(token: Token):Promise<Token | void> {
        try {
            const tokenObj = await this.manager.save(token);

            return tokenObj;
        } catch(e) {
            if (e) {
                throw new Error('Произошла ошибка в createToken!');
            }
        }
    }

    async updateToken(id: string, expires_on: number):Promise<void> {
        try {
            await this.repository
                .createQueryBuilder()
                .update()
                .set({ expires_on: expires_on })
                .where('id = :id', { id })
                .execute();
                
            const totalRes = await this.repository.findOne(id);
            if (!totalRes) throw new InvalidTokenExeption('Invalid token');

            return;
        } catch(e) {
            if (e) { 
                throw new Error('Произошла ошибка в updateToken!')
            }
        }
    }

    async removeTokenById(id: string):Promise<void> {
        try {
            await this.repository.delete(id);

            return;
        } catch(e) {
            if (e) {
                throw new Error('Произошла ошибка в removeTokenById!')
            }
        }
    }

    async removeTokenByUserId(userId: string):Promise<void> {
        try {
            await this.repository
                .createQueryBuilder()
                .delete()
                .where("user_id = :userId", { userId })
                .execute();

            return;
        } catch(e) {
            if (e) {
                throw new Error('Произошла ошибка в removeTokenByUserId!')
            }
        }
    }

    async getQuantityTokens(userId: string):Promise<number | void> {
        try {
            const num = await this.repository.count({ where: { user_id: userId } });
                      
            return num;
        } catch(e) {
            if (e) {
                throw new Error('Произошла ошибка в getQuantityTokens!')
            }
        }
    }
}