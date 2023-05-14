import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const registerController = async(req,res)=>{
    try {
        /* getting values from request */ 
        const {name, email, password, role} = req.body

        /* validation */
        if(!name){
            return res.send({ message : "name is required" })
        }if(!email){
            return res.send({ message : "email is required" })
        }if(!password){
            return res.send({ message : "password is required" })
        }if(!role){
            return res.send({ message : "role is required" })
        }

        /* checking for duplicate user */
        const existingUser = await UserModel.findOne({email})
        if( existingUser ){
            return res.status(200).send({
                success:false,
                message:"User Alredy Registered"
            })
        }

        /* create hash password  */
        const saltOrRounds = 10
        const hashedPassword = bcrypt.hashSync(password, saltOrRounds)

        /* saving into user model */
        const user = await UserModel({name, email, password:hashedPassword, role}).save()
        res.status(200).send({
            success:true,
            message:"User Registered Successfully",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })
        error
    }
}

export const loginController = async(req, res)=>{
    try {
        /* getting request */
        const { email, password } = req.body

        /* validation */
        if(!email || !password ){
            return res.status(500).send({
                sucess:false,
                message:"Invalid email or password"
            })
        }
        /* checking user */
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(500).send({
                sucess:false,
                message:"email is not registered"
            })
        }
        /* checking password */
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(500).send({
                success:false,
                message:"Invalid password"
            })
        }
        /* signing token */
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'}); 

        /* sending user */
        return res.status(200).send({
            success:true,
            message:"login succesfully",
            user:{
                name:user.name,
                email:user.email,
                role:user.role
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}

