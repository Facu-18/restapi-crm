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
mongoose.connect(process.env.URL_DB, {
    useNewUrlParser: true
})

// CREAR APP
const app = express();

// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// definir un dominio(s) para rebicir peticiones
const whitelist = [process.env.URL_BACK + process.env.PORT]
const corsOptions = {
    origin: (origin, callbakc)=>{
        // revisar si la peticion esta en whitelist
        const existe = whitelist.some( dominio => dominio === origin)
        if(existe){
            callbakc(null, true)
        }else{
            callbakc(new Error('No autorizado'))
        }
    }
}

// Cors
app.use(cors(corsOptions))

// RUTAS
app.use('/', appRoutes)

// carpeta publica
app.use(express.static('uploads'))

// PUERTO
app.listen(process.env.PORT)