const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("../config/db");
const Contact = require("../model/userContact");



const router = express.Router();
app.use(cookieParser());
app.use(bodyParser.json());

router.post('/submit', async (req, res) => {
    try{

   
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log(newContact);
    res.status(200).send('Message sent successfully');
    // newContact.save((err) => {
    //   if (err) {
    //     console.error(err);
    //     res.status(500).send('Error saving contact');
    //   } else {
    //     res.status(200).send('Message sent successfully');
    //   }
    // });
} catch(err){
    res.send(err);
}
});

module.exports = router;