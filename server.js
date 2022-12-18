require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const Message = require('./model/message')
const mongoose = require('mongoose');


//connect to mongoose localhost
// mongoose.connect("mongodb://localhost:27017/msgDB");

//cluster online
mongoose.connect(process.env.DB_HOST);

//body-parser
app.use(bodyparser.urlencoded({extended: true}));

//public
app.use(express.static("public"));

//ejs
app.set('view engine', 'ejs'); //ejs vs jade


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

//save msg to db
app.post("/message", async (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    try{
        const response = await Message.create({
            name,
            email,
            subject,
            message
        });
        // console.log(response);
    } catch(err){
        throw err
    }
    res.sendFile(__dirname + "/success.html")
});


//404 status code
app.get('*', function(req, res){
    res.status(404).send("Page not found")
});

//server
let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}
app.listen(port, function(){
    console.log("server started on 3000...")
});