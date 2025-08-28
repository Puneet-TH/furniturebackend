import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    message:{
        type:String,
        required:[true,"message is required"]
    }
},{timestamps: true})

const Enquiry = mongoose.model("Enquiry",enquirySchema);
export default Enquiry;