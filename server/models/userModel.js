import mongoose from "mongoose";

//correct

const userSchema = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type: String , required: true , unique: true},
    password: {type: String , required: true},
    creditBalance:{type: Number , default:5},
})

const userModel = mongoose.model.user  || mongoose.model("user" , userSchema) // will search for the model named user if not found then will create a new model named user with name schema

export default userModel;