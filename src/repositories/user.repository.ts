import { EntityRepository, AbstractRepository } from "typeorm";
import { User } from "../entity/User";
import { IUser, IUserWithoutPass } from "../types/types";

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {

    async createAndSave(user: IUser):Promise<void> {
        try {
            await this.manager.save(user);
            return;
        } catch(e) {
            if (e) {
                throw new Error('Произошла ошибка в createAndSave!')
            }
        }
    }

    async checkFreeEmail(email: string):Promise<IUser | void> {
        try {
            const user = await this.repository.findOne({ email });
            return user;
        } catch(e) {
            if (e) {
                throw new Error('Произошла ошибка в findByEmail!');
            }
        }
    }

    async findUser(email: string):Promise<IUser | void> {
        try {
            const user = await this.repository.findOne({ email });           
            return user;
        } catch(e) {
            if (e) {
                throw new Error('Произошла ошибка в findUser!');
            }
        }
    }

    async findUserByID(id:string):Promise<IUserWithoutPass | void> {
        try {
            const user = await this.repository.findOne(id);
            return user;
        } catch(e) {
            if (e) {
                throw new Error('Произошла ошибка в findUserByID!');
            }
        }
    }

}