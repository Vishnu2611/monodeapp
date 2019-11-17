const mongo = require('mongoose');
const jwt = require('jsonwebtoken');
const student = require('../db/models/student');

const db = "mongodb://localhost:27017/certificate";//config.get('mongoURI');

const register = (email,name,pass) => {
    return new Promise((resolve, reject) => {
        //connection to mongodb
        mongo.connect(db,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database connected")
            const newstudent =  new student({
                name: name,
                email: email,
                password: pass
            });
            newstudent.save().then(item => resolve(item)).catch(err => reject(err));
        })
        .catch(() => console.log("Database connection error!!"));
    });
}

 const login =  (email, password) => {
     return new Promise((resolve,reject) => {
        mongo.connect(db,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database connected");
            student.findOne({email: email}).exec((error,student) => {
                if(error)
                    reject(error);
                else if(!student)
                    reject({response: "There is no student!!!"});
                else{
                    if(password === student.password)
                        //generation of jwt
                       jwt.sign({username: student.name, password: student.password}, 'secretkey', {expiresIn: 300}, (err,token) =>{
                           if(err)
                               reject(err);
                            else
                                resolve(token);
                       })
                    else
                        reject({response: "Invalid Password!!"});
                }
         });
        })
        .catch(() => console.log("Database connection error!!"));
    });
 }

const passwordreset =  (email, pass, newpass) => {
    return new Promise( (resolve,reject) => {
        mongo.connect(db,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
        .then( () => {
            console.log("Database connected");
            student.findOne({email: email}).exec( (error,student1) => {
                if(error)
                    reject(error);
                else if(!student1)
                    reject({response: "There is no student!!!"});
                else{
                    if(pass === student1.password){
                        console.log("hi");
                        // mongo.connect(db,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
                        // .then( () => {
                            student.findOneAndUpdate({email: email}, { $set: { password: newpass} },{new: true, passRawResult: true, useFindAndModify:true}, (error, doc, raw) => {
                                if(error)
                                   reject(error);
                                else if(!doc)
                                   reject({response: "There is no student!!!"});
                                else
                                  resolve({response: "The password has been updated"});
                            });
                        // }).catch(()=> {
                        //     reject({response: "There is some issue!!!"});
                        // })
                    }
                    else
                    reject({response: "Invalid Password!!"});
                }
            });
        })
        .catch(() => console.log("Database connection error!!"));
    });
}

module.exports = {
    register: register,
    login: login,
    passwordreset: passwordreset
}
