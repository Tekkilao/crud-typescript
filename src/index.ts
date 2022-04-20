import express, {json} from 'express';
import {router} from './routes/router';
import {db} from './database/db';
import {engine} from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';


const app = express();
app.use(express.json())
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', router);

app.listen(3000, async () => {
    await db.sync();
    console.log(`Server running on port 3000`)
})