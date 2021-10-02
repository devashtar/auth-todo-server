import bcrypt from 'bcrypt';

export default async function(password: string):Promise<string> {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const passwordHash = await bcrypt.hash(password, salt);
        return passwordHash;
    } catch(e) {
        console.log('Ошибка при попытке хешировать пароль');
        throw e;
    }
}