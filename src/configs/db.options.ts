import { ConnectionOptions } from 'typeorm';

// const typeormOptions: ConnectionOptions = {
//     type: "postgres",
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT || 5432),
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     logging: false,
//     synchronize: true,
//     entities: [
//         "./src/entity/*.ts"
//     ],
//     migrations: [
//         "./src/migration/*.ts"
//     ]
// };

const typeormOptions: ConnectionOptions = {
    type: "sqlite",
    database: './storage.sql',
    logging: false,
    synchronize: true,
    entities: [
        "./src/entity/*.ts"
    ],
    migrations: [
        "./src/migration/*.ts"
    ]
};

export default typeormOptions;