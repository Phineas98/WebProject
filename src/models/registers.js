const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DanceSchema = new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      gender:{
        type:String,
        required:true
      },
      age:{
        type:Number,
        // required:true
      },
      phone:{
        type:Number,
        required:true,
        unique:true
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true
      },
      confirmpassword:{
        type:String,
        required:true
      },
});

// hashing 

DanceSchema.pre("save", async function(next){
  if(this.isModified("password")){
    console.log(`The current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`The current password is ${this.password}`);
  }
  this.confirmpassword = undefined;
  next();
})


const Register = new mongoose.model("danceacedemy", DanceSchema);

module.exports = Register;