const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT || 5502;

const { MONGODB_USERNAME, MONGODB_PASSWORD, DATABASE_NAME } = process.env;

mongoose.connect(
  `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.wi9utmb.mongodb.net/registrationFormDB`
);
//registration schema
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//model of registration schema
const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.redirect('http://127.0.0.1:5502/Registration%20Form/Frontend/index.html');
});
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Registration.findOne({ email: email });

    if (!existingUser) {
      const registrationData = new Registration({
        name,
        email,
        password,
      });
      await registrationData.save();
      // res.send("Succesfuly Dead")

      res.redirect("http://127.0.0.1:5502/Registration%20Form/Frontend/success.html");
    } else {
      
      res.redirect("http://127.0.0.1:5502/Registration%20Form/Frontend/error.html");
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/success", (req, res) => {
  res.sendFile(_dirname + "/pages/success.html");
});
app.get("/error", (req, res) => {
  res.sendFile(_dirname + "/pages/error.html");
});

app.listen(port, () => {
  console.log(`server is running on prot ${port}`);
});
