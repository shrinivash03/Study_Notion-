//require statements
require("dotenv").config();
const mongoose=require('mongoose');


exports.connect=()=>{
  mongoose.connect('mongodb+srv://hanumanjee:852147963@cluster0.nlhcwea.mongodb.net/study-notion',{
  }).then(()=>{console.log("DB CONNECTION SUCCESSFUL")})
  .catch((err)=>{
    console.log("DB CONNECTION ISSUES");
    console.error(err);
    process.exit(1);
  })
}
