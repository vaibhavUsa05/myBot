const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/mybotDatabase', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log('Connected to MongoDB database. SignUp collection');
});
const bcrypt=require("bcrypt");
const signupSchema = new mongoose.Schema({
  Name: {
    type: String,
    minlength: 3,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Contact: {
    type: Number,
    min: 100000000, // minimum 10 digit number
    max: 9999999999, // maximum 10 digit number
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  TokenId:{
    type: String
  }
});

// before saving the data into the database encrypt the password
signupSchema.pre("save",async function(next){
if(this.isModified("Password")){
  console.log(`the password before encryption is ${this.Password}`);
  const hashPassword= await bcrypt.hash(this.Password,10);
  console.log(`the password after encryption is ${hashPassword}`);
  this.Password = hashPassword;
}
next();
});
const signupModel=new mongoose.model("Authentication_SignUp",signupSchema);
module.exports=signupModel;