const express = require('express');
const router = new express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken')
const bodyParser = require("body-parser");
const control = require('../controller/insert');
const com = require('../controller/email');

const app = express();


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/register',(req, res, next) => {
    const name = req.body.fname + " " + req.body.mname + " " + req.body.lname;
    if(req.body.password === req.body.confirmpassword){
        control.register(req.body.email, name, md5(req.body.password))
        .then( () => {
            com.email(req.body.email)
            .then(() =>{
                res.send({
                    response: "The records have been added"
                })
            })
            .catch((err) => {
                res.send({
                response: "Email is not send."
                })
            })
        }).catch( () => {
            res.send({
                response: "The records have not been added, some errors have occurred"
            });
        });
    }
    else{
        res.send({
            response: "The passwords don't match"
        });
    }
});

router.post('/login', async (req, res, next) => {
    control.login(req.body.email, md5(req.body.password)).then((token) =>{
        if(token){
            res.send({token: token});
        }
        else{
            res.sendStatus(403);
        }
     }).catch((error) => {
         res.sendStatus(403).json(error);
     });
});
router.patch('/passwordreset', async (req, res, next) => {
    // console.log(req.body.email);
    // console.log(req.body.newpassword);
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        jwt.verify(token, 'secretkey',(err,authdata) => {
            if(err)
                res.sendStatus(403);
            else{
                control.passwordreset(req.body.email, md5(req.body.password), md5(req.body.newpassword))
                .then((info) => {
                    res.send(info)
                })
                .catch((err) => {
                    res.send(err);
                });
            }
        });
    }
    else
        res.sendStatus(403);
});

module.exports = router;