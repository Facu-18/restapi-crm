import mongoose from "mongoose";
import { Schema } from "mongoose";

const usuariosSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: 'Agrega tu nombre'
    },
    password: {
        type: String,
        required: true
    }
});

const Usuarios =  mongoose.model('Usuarios', usuariosSchema);

export default Usuarios