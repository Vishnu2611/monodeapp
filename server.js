const mongo = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

mongo.connect(db,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify: true})
.then(() => console.log("Database connected"))
.catch(() => console.log("Database connection error!!"));