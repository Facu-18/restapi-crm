import express, { Router } from 'express'
import {nuevoCliente, getCliente, getClienteId, uptadeCliente, deleteCliente} from '../controllers/clienteController.js'
import { nuevoProducto, subirImagen, getProductos, getProductoId, updateProducto, deleteProducto, buscarProducto} from '../controllers/productosController.js'
import {nuevoPedido, getPedidos, getPedidosId, updatePedido, deletePedido} from '../controllers/pedidosController.js'
import { nuevoUsuario, iniciarSesion } from '../controllers/usuariosController.js'

// importar middleware para proteger rutas
import  authenticateToken  from '../middleware/auth.js'

const router = express.Router()

 // Agregar y obtener clientes
 router.post('/clientes', authenticateToken, nuevoCliente)
 router.get('/clientes', authenticateToken, getCliente)
 router.get('/clientes/:id', authenticateToken, getClienteId)

 // Actualizar clientes
 router.put('/clientes/:id', authenticateToken, uptadeCliente)

 // eliminar cliente
 router.delete('/clientes/:id', authenticateToken, deleteCliente)

 // Productos
 router.post('/productos',  authenticateToken, subirImagen, nuevoProducto)
 router.get('/productos',  authenticateToken, getProductos)
 router.get('/productos/:id',  authenticateToken, getProductoId)
 router.put('/productos/:id',  authenticateToken, subirImagen, updateProducto)
 router.delete('/productos/:id', authenticateToken, deleteProducto)

 // Busqueda de productos
 router.post('/productos/busqueda/:query', authenticateToken, buscarProducto)

 // Pedidos
 router.post('/pedidos/nuevo/:id',  authenticateToken, nuevoPedido)
 router.get('/pedidos',  authenticateToken, getPedidos)
 router.get('/pedidos/:id', authenticateToken, getPedidosId)
 router.put('/pedidos/:id', authenticateToken, updatePedido)
 router.delete('/pedidos/:id', authenticateToken, deletePedido)

 // Usuarios
 router.post('/usuarios/nuevo', nuevoUsuario)
 router.post('/usuarios/iniciar-sesion',  iniciarSesion)


export default router;