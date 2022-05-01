import express, {json} from 'express';
import {router} from './routes/router';
import {db} from './database/db';
import {engine} from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import cookieParser from "cookie-parser"
import deserializeUser from './middleware/deserializeUser';


const app = express();
app.use(express.json())
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', router);
app.use(deserializeUser)


dotenv.config()

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, async () => {
    await db.sync();
    console.log(`Server running on port ${PORT}`)
})