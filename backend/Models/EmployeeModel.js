const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
    },
    department:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:Date,
        default: new Date()
    },
    UpdatedAt:{
        type:Date,
        default: new Date()
    },
})

const EmployeeModel = mongoose.model('employees', EmployeeSchema)
module.exports = EmployeeModel;