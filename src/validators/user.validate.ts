import { UserValidator } from '../exceptions/user.exeption';
import { IUserEmailAndPass } from '../types/types';

function validateEmail(email: string | unknown):boolean {
    if (typeof email !== 'string') return false;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password: string | unknown):boolean {
    if (typeof password !== 'string') return false;
    if (password.length < 4 || password.length > 30) return false;
    return true;
}

export default function userValidate(obj: any):IUserEmailAndPass {
    const { email, password } = obj;
    const resEmail = validateEmail(email);
    const resPassword = validatePassword(password);

    if (!resEmail || !resPassword) throw new UserValidator('Некорректный пароль или email!');

    return { email, password };
}