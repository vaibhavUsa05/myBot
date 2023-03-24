const ExistingUser = require("../modals/authenticationSchema/login_schema");
const NewSignupToUser = require("../modals/authenticationSchema/signup_schema");
const HttpError = require("../modals/error");
const jwt = require("jsonwebtoken");
const crypto=require("crypto")
const bcrypt = require("bcrypt");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '/config/.env') });

// Fine
const HomePageLoginController = async (req, res, next) => {
  const responseObject={
    isExistingUser:true,
    passwordMatching:true
  }
  try {
    const { Email, Password } = req.body;
    console.log("login data in the backend is coming " + Email + "  " + Password);
    const findExistingUser = await NewSignupToUser.findOne({ Email: Email});
     console.log("this is retreive documnet" + findExistingUser);
    if (!findExistingUser) {
      console.log( new HttpError("Such user does not exist", 404));
      responseObject.isExistingUser=false;
      res.send(responseObject);
    } else if(findExistingUser) {
      try{
        console.log("Password:", Password);
        console.log("findExistingUser.Password:", findExistingUser.Password);
        
      const matchingPassword= await bcrypt.compare(Password,findExistingUser.Password);
      // if (!matchingPassword) {
      //   console.log('Password does not match');
      //   responseObject.passwordMatching = false;
      // } else {
      //   console.log('Password matches');
      //   // Add logic to generate token and save it to database
      // }
      
      if(!matchingPassword){
        console.log(matchingPassword);
        console.log("password is not matching");
        console.log("loggin use password : " + Password);
        console.log("db password : "+ findExistingUser.Password);
        responseObject.passwordMatching=false;
            }
if(matchingPassword){
      const key = findExistingUser._id;
      console.log(key);
    responseObject.isExistingUser=true;
console.log(`the payload name is ` + findExistingUser.Name);
    // jst access
    const payload = {
      Email: findExistingUser.Email,
      _id: findExistingUser._id,
      Name:findExistingUser.Name,
      TokenId:findExistingUser.TokenId
    };
    
    //settin up the access_token
    const access_token=jwt.sign(payload,"dfcd8c8c6b1feff918e8a4166d7e7a98eb5fcc33f40eddd99b103d2f2f8f6082");
    console.log(access_token)
    // settin up the jwtoken
    res.cookie("jwtoken",access_token,{
  expires: new Date(Date.now()+25892000000),
  httpOnly:false
})
}
      res.send(responseObject);
    //   console.log("congo bro");
    //  console.log("response after user has log in ");
      // res.redirect("/user/authentication/login/chatPage")
    }catch(err){
    console.log("this is hashing error "+ err);
    }
  }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const ExistingUserController=async(req,res,next)=>{

try{
 const {Email}= req.params.Email;
const retrieveUserWithEmail= await NewSignupToUser.find({Email : Email});
console.log(retrieveUserWithEmail);
if(retrieveUserWithEmail){
  console.log("retrieving user data ...... sending to frontend for avatars");
  res.send(retrieveUserWithEmail);
}

}catch(err){
res.send(err);
}

}
// Fine 
const HomePageSignupController = async (req, res, next) => {
  const responseObject={ // creating the object to tell the frontend that the user with given credentials already exist;
    isExistingUser:false
  }
  try {
    const { Name ,Email, Contact, Password } = await req.body;
    console.log("data in the backend is getting fetched : " +Name + Email + Contact + Password)
    const existingUser = await NewSignupToUser.findOne({ Email});

    if (existingUser) {
      // throw new HttpError("User already exists", 409);
      responseObject.isExistingUser=true; // if user already exist with the same credentials then send true to client side;
      res.send(responseObject);
    } else {
      const secreteKeyGenerator = Math.random().toString(36);
      const TokenId= jwt.sign(
        {email:Email },
        secreteKeyGenerator,
        { expiresIn: "1h" }
      );

      const newuser = await new NewSignupToUser({
        Name,
        Email,
        Contact,
        Password,
        TokenId
      });
       newuser.save();
      console.log("in the backend new data is after hashing password "+ newuser);
      // console.log({ message: "Data is inserted successfully", TokenId });

     res.send(responseObject);
       return ;
    }
  } catch (err) {
    console.log(err);
next(err);
  }
};
exports.ExistingUserController=ExistingUserController;
exports.HomePageLoginController = HomePageLoginController;
exports.HomePageSignupController = HomePageSignupController;
