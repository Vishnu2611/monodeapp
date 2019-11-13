const express = require('express');
const md5 = require('md5');
const bodyParser = require("body-parser");
const control = require('../controller/insert');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/add',(req, res, next) => {
    const name = req.body.fname + " " + req.body.mname + " " + req.body.lname;
    control.insert(req.body.email, name, md5(req.body.password));
    res.send({
        response: "The records have been added"
    })
});

app.post('/ret',async (req, res, next) => {
    const name = req.body.fname + " " + req.body.mname + " " + req.body.lname;
     const result = await control.retrieve(req.body.email, md5(req.body.password)).then((result) =>{
        if(result){
            res.redirect('https://www.google.com');
        }
        else{
            res.send({
                response: "error!!!"
            })
        }
     }).catch((error) => {
         res.send({
             response: error
            });
     });

});


app.listen(4200, () => {
    console.log("Server running on port 4200.");
});