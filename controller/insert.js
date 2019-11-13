const mongo = require('mongoose');
const config = require('config');
const student = require('../models/student');

const db = "mongodb://localhost:27017/certificate";//config.get('mongoURI');

//inserting new students
const insert = (email,name,pass) => {
    return new Promise((resolve, reject) => {
        //connection to mongodb
        mongo.connect(db,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify: true})
        .then(() => console.log("Database connected"))
        .catch(() => console.log("Database connection error!!"));
        const newstudent =  new student({
            name: name,
            email: email,
            password: pass
        });
        newstudent.save().then(item => resolve(item)).catch(err => reject(err));
        //    mongo.connection.close();
    });
}

 const retrieve = (email, password) => {
     return new Promise((resolve, reject) => {
        mongo.connect(db,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify: true})
        .then(() => console.log("Database connected"))
        .catch(() => console.log("Database connection error!!"));
        const idk =  student.findOne({email: email}).exec((error,student) => {
            if(error)
                reject(error);
            else if(!student)
                reject({response: "There is no student!!!"});
            else{
                if(password===student.password)
                   resolve(true);
                else
                    resolve(false);                ;
            }
     })
    });
   // mongo.connection.close();
 }
module.exports = {
    insert: insert,
    retrieve: retrieve
}
