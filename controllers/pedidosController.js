import Pedidos from "../models/Pedidos.js";
import Productos from "../models/Productos.js";

export const nuevoPedido = async(req,res,next)=>{
    const pedido = new Pedidos(req.body)
    try{
       await pedido.save()
       res.json({mensaje: 'se agrego el pedido'})
    }catch(error){
        console.log(error);
        next()
    }
}

export const getPedidos = async(req,res,next)=>{
    try{
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos)
    }catch(error){
        console.log(error);
        next()
    }
}

export const getPedidosId = async(req,res,next)=>{
    const pedido = await Pedidos.findById(req.params.id).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    });

    if(!pedido){
        res.json({mensaje: 'el pedido no existe'})
        return next();
    }

    res.json(pedido)
}

export const updatePedido = async(req,res,next)=>{
    try{
        let pedido = await Pedidos.findByIdAndUpdate({_id: req.params.id}, req.body,{
            new: true
        }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedido)
    }catch(error){
        next()
    }
}

export const deletePedido = async(req,res,next)=>{
    try{
        await Pedidos.findOneAndDelete({_id: req.params.id})
        res.json({mensaje: 'el pedido se ha eliminado correctamente'})
    }catch(error){
        console.log(error);
        next();
    }
}