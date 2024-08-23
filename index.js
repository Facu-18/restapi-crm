import express from 'express';
import appRoutes from './routes/appRoutes.js'
import dotenv from 'dotenv';
import { mongoose } from 'mongoose';
import bodyParser from 'body-parser'

dotenv.config();

// CONECTAR MOGO
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true
})

// CREAR APP
const app = express();

// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// RUTAS
app.use('/', appRoutes)

// PUERTO
app.listen(process.env.PORT)