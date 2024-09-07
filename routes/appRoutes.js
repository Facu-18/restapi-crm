import express, { Router } from 'express'
import {nuevoCliente, getCliente, getClienteId, uptadeCliente, deleteCliente} from '../controllers/clienteController.js'
import { nuevoProducto, subirImagen, getProductos, getProductoId, updateProducto, deleteProducto, buscarProducto} from '../controllers/productosController.js'
import {nuevoPedido, getPedidos, getPedidosId, updatePedido, deletePedido} from '../controllers/pedidosController.js'

const router = express.Router()

 // Agregar y obtener clientes
 router.post('/clientes', nuevoCliente)
 router.get('/clientes', getCliente)
 router.get('/clientes/:id', getClienteId)

 // Actualizar clientes
 router.put('/clientes/:id', uptadeCliente)

 // eliminar cliente
 router.delete('/clientes/:id', deleteCliente)

 // Productos
 router.post('/productos', subirImagen, nuevoProducto)
 router.get('/productos', getProductos)
 router.get('/productos/:id', getProductoId)
 router.put('/productos/:id', subirImagen, updateProducto)
 router.delete('/productos/:id', deleteProducto)

 // Busqueda de productos
 router.post('/productos/busqueda/:query', buscarProducto)

 // Pedidos
 router.post('/pedidos', nuevoPedido)
 router.get('/pedidos', getPedidos)
 router.get('/pedidos/:id', getPedidosId)
 router.put('/pedidos/:id', updatePedido)
 router.delete('/pedidos/:id', deletePedido)

export default router;