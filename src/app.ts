import dotenv from 'dotenv';
dotenv.config();
import server from  './server';
import connectToDb from './db/index';
const PORT = process.env.PORT || 4000;

async function runApp() {
    try {
        await connectToDb();

        server.listen(PORT, async () => {
            try {
                console.log(`Server is running on: http://localhost:${PORT}`);
            } catch(e) {
                throw e;
            }
        });

    } catch(e) {
        if (e) {
            console.log(e);
        }
    }
}

runApp();



