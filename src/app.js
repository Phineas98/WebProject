const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 4000; 
const mongoDbURL = process.env.MONGODB_URL || 'mongodb://mongo/api_demo'

require("./db/conn");

const Register = require("./models/registers");
const e = require("express");

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res)=>{
  res.render("index");
});

app.get("/registration", (req, res)=>{
  res.render("registration");
});

app.post("/registration", async(req, res)=>{
  try {
    
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if(password === cpassword){

      const registerEmployee = new Register({
        name:req.body.name,
        gender:req.body.gender,
        age:req.body.age,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword
      })

      const registered =  await registerEmployee.save();
      res.status(200).render("login");

    }else{
      res.send("password are not matching")
    }

  } catch (error) {
    res.status(400).send(error)
  }
});

// Login form 

app.get("/login", (req, res)=>{
  res.render("login");
});

app.post("/login", async(req, res)=>{
      try {

        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        const isMatch = bcrypt.compare(password, useremail.password)
        
        if(isMatch){
          res.status(201).render("index");
        }else{
          res.send("invalid Login Details");
        }
        
      } catch (error) {
        res.status(400).send("Invalid login Details")
      }
});


app.listen(port, ()=>{
  console.log(`Connecton successfully on PORT ${port}`);
});