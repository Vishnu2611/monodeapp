const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken')

 router.post('/dashboard', (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader != 'undefined'){
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
//            console.log(bearer);
            jwt.verify(token, 'secretkey',(err,authdata) => {
                if(err)
                    res.sendStatus(403);
                else
                    res.redirect('https://www.google.com');
            });
        }
        else
            res.sendStatus(403);
});

module.exports = router;
