import express from 'express';
import appRoutes from './routes/appRoutes.js'
import dotenv from 'dotenv';
import { mongoose } from 'mongoose';
import bodyParser from 'body-parser'
 
// Cors permite que un cliente se conecte a otro sv para cambio de recursos
import cors from 'cors'

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

// Cors
app.use(cors())

// RUTAS
app.use('/', appRoutes)

// carpeta publica
app.use(express.static('uploads'))

// PUERTO
app.listen(process.env.PORT)