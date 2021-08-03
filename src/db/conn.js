const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/registrationform', {
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
}).then(() => {
  console.log(`connection successfull`);
}).catch((err) => {
  console.log(`no connection`);
})

