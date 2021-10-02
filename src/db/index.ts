import { createConnection, Connection  } from "typeorm";
import typeormOptions from '../configs/db.options';

function connectToDb() {
    return new Promise(async (resolve, reject) => {
        try {
            const connection: Connection = await createConnection(typeormOptions);
            resolve(connection);
        } catch(e) {
            if (e) {
                reject(e);
            }
        }
    })
}

export default connectToDb;