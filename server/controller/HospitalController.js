import HospitalModel from "../models/HospitalModel.js";

export const createHospitalController = async(req,res)=>{
    try {
        const {name, city,state, UID, address, logo} = req.fields
        const {photo} = req.files
        const {} = new HospitalModel.find()
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in hospital",
            error
        })
    }
}