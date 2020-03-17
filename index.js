require('dotenv').config();
const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const sgTransport = require('nodemailer-sendgrid-transport');
const bodyParser = require('body-parser');

const compression = require('compression');
const helmet = require('helmet');


const app = express();
app.use(helmet());
const port = process.env.PORT || "80";

/////////////////////   CONTACT FORM HANDLER  /////////////////////

app.use(bodyParser.urlencoded({extended: true}));

var options = {
  auth: {
    api_user: process.env.USER,
    api_key: process.env.SENDGRID_API_KEY
  }
}

var client = nodemailer.createTransport(sgTransport(options));

app.post('/send-email', function (req, res) {

  var body = req.body;
  var name = body.name;
  var email = body.email;
  var social = body.social;
  var message = body.message;
  var service = body.service;

  var composedMessage = {
      from: 'website@justcatalyst.com',
      to: 'octavian@justcatalyst.com',
      text: 'Hey Dan!\n\n' +
        `${name} has contacted you through your website. Here is their contact information and message: \n\n` +
        `Name: ${name} \n` +
        `Email Address: ${email} \n` +
        `Social: ${social} \n` +
        `Message: ${message} \n` +
        `Service: ${service} \n\n`,
      subject: 'Website Contact Form'
    };

  client.sendMail(composedMessage, function(err, info){
      if (err ){
        res.redirect("/");
      }else {
        res.redirect("contact");
      }

  });


});



/////////////////////   VIEWS  /////////////////////

app.use(compression()); //Compress all routes

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.get("/expertise", (req, res) => {
  res.render("expertise", { title: "Expertise" });
});
app.get("/projects", (req, res) => {
  res.render("projects", { title: "Projects" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});
app.get("/pod", (req, res) => {
  res.render("pod", { title: "Print on demand" });
});
app.get("/manufacturing", (req, res) => {
  res.render("manufacturing", { title: "Manufacturing" });
});
app.get("/cosmetics", (req, res) => {
  res.render("cosmetics", { title: "Cosmetics" });
});
app.get("/fitness", (req, res) => {
  res.render("fitness", { title: "Fitness" });
});



app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
