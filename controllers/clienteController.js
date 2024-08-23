import Clientes from "../models/Cliente.js";

//agrega cliente
export const nuevoCliente = async (req,res, next)=>{
   const cliente = new Clientes(req.body)

   try{
       // almacenar el registro
       await cliente.save();
       res.json({mensaje: 'se agrego'})
   
    }catch(error){
    console.log(error);
    next();
   }
}

export const getCliente = async (req,res,next)=>{
   try{
      const clientes = await Clientes.find({})
      res.json(clientes);


   }catch(error){
      console.log(error)
      next();
   }
}

export const getClienteId = async (req,res,next)=>{
   try{
      const id = req.params.id
      const cliente = await Clientes.findById(id);
      
      if(!cliente){
        res.json({mensaje: 'el cliente no existe'});
        next()
      }
      
      res.json(cliente)

   }catch(error){
      console.log(error);
      next();
   }
}

export const uptadeCliente = async (req,res,next)=>{
   try{
      const id = req.params.id
      const cliente = await Clientes.findOneAndUpdate({_id: id}, req.body,{
         new: true
      });
      res.json(cliente)
      
      
      if(!cliente){
         res.json({mensaje: 'no se encontro el cliente a actualizar'})
      }

   }catch(error){
      console.log(error)
      next();
   }
}

export const deleteCliente = async (req,res,next)=>{
   try{
      const id = req.params.id
      await Clientes.findOneAndDelete({_id: id})
      res.json({mensaje: 'El cliente se elimino correctamente'})
   }catch(error){
      console.log(error)
      next();
   }
}