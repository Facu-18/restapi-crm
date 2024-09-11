import Usuarios from "../models/Usuarios.js"
import  jwt  from "jsonwebtoken"
import bcrypt from 'bcrypt'

export const nuevoUsuario = async (req,res) =>{
   // leer los datos del usuario y almacenar en la BD
   const usuario = new Usuarios(req.body);
   usuario.password = await bcrypt.hash(req.body.password, 12)
   
   try{
     await usuario.save();
     res.json({mensaje: 'Usuario Creado Correctamente'})
   }catch(error){
     console.log(error);
     res.json({mensaje: 'Hubo un error'});
   }
}

export const iniciarSesion =  async (req,res,next)=>{
  // buscar el usuario en la bd
  const usuario = await Usuarios.findOne({email:req.body.email})
  
  if(!usuario){
    await res.status(401).json({mensaje: 'Usuario no encontrado'})
    next();
}
    
    else{
        // verificar la contraseña 
        const comparar = await bcrypt.compare(req.body.password, usuario.password)

        if(!comparar){
            res.status(401).json({mensaje: 'Contraseña Incorrecta'})
            next();
        }
        else{
            // generar token
            const token = jwt.sign({
                id: usuario._id,
                email: usuario.email,
                nombre: usuario.nombre
            }, process.env.SECRET_KEY,{expiresIn:60*60*24});
            
            res.json({token})

        }
    }
}