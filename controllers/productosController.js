import Productos from "../models/Productos.js";
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import shortid from 'shortid';
import multer from "multer";
import exp from "constants";
import fs from 'fs'

// Obtener el nombre del archivo y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Configuración de almacenamiento de Multer
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/imagen-productos'));
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        cb(null, `${shortid.generate()}.${extension}`);
    },
});

// Configuración de Multer
const configuracionMulter = {
    limits: {
        fileSize: 10000000 // Tamaño máximo de archivo 10 MB
    },
    storage: fileStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Formato de archivo no permitido'), false);
        }
    }
};

// Middleware de Multer para subir una sola imagen
const upload = multer(configuracionMulter).single('imagen');

// Middleware para cargar una sola imagen y luego pasar al siguiente middleware
export const subirImagen = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next(); // Pasar al siguiente middleware si la carga es exitosa
    });
};


export const nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body)

    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename
        }

        await producto.save();
        res.json({ mensaje: 'Se agrego un nuevo producto' })
    } catch (error) {
        console.log(error)
        next();
    }
}

export const getProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({})
        res.json(productos);


    } catch (error) {
        console.log(error)
        next();
    }
}

export const getProductoId = async (req, res, next) => {
    try {
        const id = req.params.id
        const producto = await Productos.findById(id);

        if (!producto) {
            res.json({ mensaje: 'el producto no existe' });
            return next()
        }

        res.json(producto)

    } catch (error) {
        console.log(error);
        next();
    }
}

export const updateProducto = async (req, res, next) => {
    try {
        const id = req.params.id;

        // Obtener el producto anterior antes de actualizarlo
        const productoAnterior = await Productos.findById(id);

        if (!productoAnterior) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        // Crear el nuevo objeto del producto
        let nuevoProducto = req.body;

        // Verificar si hay una nueva imagen
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;

            // Eliminar la imagen anterior del servidor
            const rutaImagenAnterior = path.join(__dirname, '../uploads/imagen-productos', productoAnterior.imagen);

            // Verificar si existe la imagen anterior
            fs.unlink(rutaImagenAnterior, (error) => {
                if (error) {
                    console.error('Error al eliminar la imagen anterior:', error);
                } else {
                    console.log('Imagen anterior eliminada:', rutaImagenAnterior);
                }
            });
        } else {
            // Mantener la imagen anterior si no se subió una nueva
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        // Actualizar el producto en la base de datos
        const productoActualizado = await Productos.findOneAndUpdate({ _id: id }, nuevoProducto, {
            new: true // Devuelve el nuevo documento actualizado
        });

        // Respuesta exitosa
        res.json(productoActualizado);

    } catch (error) {
        console.log(error);
        next();
    }
};

export const deleteProducto = async (req, res, next) => {
    try {
        // Encontrar el producto por ID
        const producto = await Productos.findById(req.params.id);

        // Si el producto no existe, enviar un mensaje de error
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        // Eliminar el producto
        await Productos.findByIdAndDelete(req.params.id);

        // Eliminar la imagen del servidor
        const rutaImagen = path.join(__dirname, '../uploads/imagen-productos', producto.imagen);
        fs.unlink(rutaImagen, (error) => {
            if (error) {
                console.error('Error al eliminar la imagen:', error);
            } else {
                console.log('Imagen eliminada:', rutaImagen);
            }
        });

        // Respuesta exitosa
        res.send({ mensaje: 'Producto eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
};

export const buscarProducto = async (req, res, next) => {
   try{
     // obtener query
     const { query } = req.params
     const producto = await Productos.find({nombre: new RegExp(query, 'i') });
     res.json(producto)
   }catch(error){
    console.log(error);
    next();
   }
}
