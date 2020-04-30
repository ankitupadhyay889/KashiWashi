const express = require("express");
const path = require("path");
const fs = require("fs");

var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactKashi', {useNewUrlParser: true});

const app = express();
const port = 80;


// Schema bna rhe hum 
var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
});
var Contact = mongoose.model('Contact', contactSchema);

// Express file hai
app.use('/static' , express.static('static'))// for serb=ving static file
app.use(express.urlencoded())

// Pug file hai
app.set('view engine' , 'pug')// set the template pug
app.set('views' , path.join(__dirname , 'views'))// set views directiory

app.get('/' , (req , res) => {
    const ankit = {'title' : 'KashiWashi.com'}
    res.status(200).render('main.pug' , ankit)
})

app.get('/about' , (req , res) => {
    const ankit = {'title' : 'KashiWashi.com'}
    res.status(200).render('about.pug' , ankit)
})

app.get('/suggestion' , (req , res) => {
    const ankit = {'title' : 'KashiWashi.com'}
    res.status(200).render('sugg.pug' , ankit)
})

app.post('/suggestion' , (req , res) => {
    name = req.body.name
    email = req.body.email
    phone = req.body.phone
    var ramayan = `The name of client is ${name} and his/her mail id is ${email} or contact number is ${phone}`
    fs.writeFileSync('kashi.txt' , ramayan)
    const ankit = {'title' : 'KashiWashi.com'}
    res.status(200).render('sugg.pug' , ankit)
})


app.get('/contact' , (req , res) => {
    const ankit = {'title' : 'KashiWashi.com'}
    res.status(200).render('contact.pug' , ankit)
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This have saved into the database")
    }).catch(() => {
        res.status(404).send("Item not found")
    });
    // res.status(200).render('contact.pug');
})



// Server start
app.listen(port , () => {
    console.log(`Ye Chla Humra server port ${port} pe`);
})