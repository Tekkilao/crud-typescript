import express, {json} from 'express';
import {router} from './routes/router';
import {db} from './database/db';

const app = express();

app.use(json());
app.use(router);

app.listen(3000, async () => {
    await db.sync();
    console.log(`Server running on port 3000`)
})