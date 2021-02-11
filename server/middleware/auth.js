import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET
const tokenValidator = (req,res,next) =>{
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(402).json({
            status: res.statusCode,
            message: 'Access denied no token provided'
        });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user =  decoded;
    } catch (error) {
        return res.status(400).json({
            status: res.statusCode, message:'Invalid token'
        });
    }
    return next();
}

export default tokenValidator;