import jwt from 'jsonwebtoken'

export default function authenticateToken(req, res, next) {

    // autorizacion por el header
    const authHeader = req.header('Authorization')

    console.log(authHeader)

    if (!authHeader) {
        const error = new Error('no autenticado el jwt no existe')
        error.statusCode = 401;
        throw error;
    }

    // obtener el token
    const token = authHeader.split(' ')[1]
    let verificarToken;

    // verificar token
    try {
        verificarToken = jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    // Si el token es valido, pero hay un error...
    if(!verificarToken){
        const error = new Error('no autenticado el jwt no existe')
        error.statusCode = 401;
        throw error;
    }

    next();

}
