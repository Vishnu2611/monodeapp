const mongo = require('mongoose');
const Schema = mongo.Schema;

const StudentSchema = new Schema({
    name:{
        type: 'string',
        required: true,
    },
    email:{
        type: 'string',
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: 'string',
        required: true
    },
});

module.exports = Item = mongo.model('student',StudentSchema);