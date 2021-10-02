import bcrypt from 'bcrypt';
import { InvalidUserAccount } from '../exceptions/user.exeption';

export default async function(curPassword: string, passwordFromDB: string):Promise<void> {
    try {
        const result = await bcrypt.compare(curPassword, passwordFromDB);
        if (!result) throw new InvalidUserAccount('Invalid login or password!');
        return;
    } catch(e) {
        console.log('Ошибка произошла во время сравнения хэшей паролей пользователя!');
        throw e;
    }
}