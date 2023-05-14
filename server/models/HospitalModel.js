import mongoose from "mongoose";

const HospitalModel = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    }, slug: {
        type: String,
        required: true,
    }, city: {
        type: String,
        required: true,
    }, state: {
        type: String,
        required: true,
    }, UID: {
        type: Number,
        required: true,
    }, address: {
        type: String,
        required: true,
    }, logo: {
        data: Buffer,
        ContentType: String,
    },

}, {timestamps:true} );

export default mongoose.model('hospitals', HospitalModel)