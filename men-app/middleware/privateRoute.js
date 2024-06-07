import jwt from 'jsonwebtoken';

const privateRoute = (req, res, next) => {
    try {
        // const token = req.cookies.token;

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Falta el token' });
        }

        const verify = jwt.verify(token, process.env.JWP_SECRET_KEY)

        req.user = verify.userEmail

        next();
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar el token' });
    }
};  

export default privateRoute;