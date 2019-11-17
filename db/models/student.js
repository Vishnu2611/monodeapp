const mongo = require('mongoose');
const validator = require('validator');

const Schema = mongo.Schema;

const StudentSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Email is Invalid");
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.includes("password"))
                throw new Error("Password contains Password!!!!");
        }
    },
});

module.exports = Item = mongo.model('student',StudentSchema);