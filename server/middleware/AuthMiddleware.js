import JWT from "jsonwebtoken";
import UserModel from "../models/UserModel.js";


/* verifying JWT Token */
export const ProtectedRoute = async( req, res, next )=>{
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }
}

/* checking user role */
export const isAdmin = async(req,res,next)=>{
    try {
        const user = await UserModel.findById(req.user._id);
        if (user.role !== 1)
        {
            return res.status(401).send({
                success:false,
                message:"UnAuthorised Access"
            })
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.send({error});
    }
}