import mongoose from "mongoose";

//correct

const transactionSchema = new mongoose.Schema({
    userId:{type:String , required:true},
    plan:{type:String , required:true},
    amount:{type:Number , required:true},
    credits:{type:Number , requird:true},
    payment:{type:Boolean , default:false},
    date:{type:Number},
})

const transactionModel = mongoose.model.transaction  || mongoose.model("transaction" , transactionSchema) // will search for the model named user if not found then will create a new model named user with name schema

export default transactionModel;