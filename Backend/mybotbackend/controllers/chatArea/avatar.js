const ExistingUser = require("../../modals/authenticationSchema/login_schema");
const NewSignupToUser = require("../../modals/authenticationSchema/signup_schema");
const HttpError = require("../../modals/error");
const jwt = require("jsonwebtoken");
const AvatarModel=require("../../modals/authenticationSchema/avatarSchema");
const bcrypt = require("bcrypt");


const ChatareapagecontrollerSetAvatar=async(req,res,next)=>{
console.log("you are in chat area page for setting avataar");
try{
    
// to retreive the cookies data
// console.log(req.cookies.jwtoken + " is the cookie "); 

//
const Avatar=req.body.Avatar;
const dataPayload= AuthenticateToken(req.cookies.jwtoken);
if(dataPayload==0){
    return;
}
console.log( "dataPayloads tokenid :" +  dataPayload.TokenId + "name " + dataPayload.Name + " id "+ dataPayload._id);
const response = await new AvatarModel({
    TokenId: dataPayload.TokenId,
    Name : dataPayload.Name ,
    Email : dataPayload.Email ,
    Avatar : Avatar
});
const user= response.save();
 console.log(Avatar);
if(user){
console.log("user with avatar is created successfully" + response.Avatar);

// navigate to the chatPage;


}
else{
    console.log("error in 404 avatar");
}
}catch(err){
    console.log("error 500 in avatar" + err);
}

}



function AuthenticateToken(cookieData) {
    const secretKey = 'dfcd8c8c6b1feff918e8a4166d7e7a98eb5fcc33f40eddd99b103d2f2f8f6082';
    //   const token = req.cookies.jwtoken;
    const token=cookieData;
      if (!token) {
        console.log('Access denied. No token provided.');
        return 0;
      }
    
      try {
        const payload = jwt.verify(token, secretKey);
        console.log("this is the payload" + payload.Name);
        return payload;
      } catch (ex) {
       console.log("invalid token");
       return 0;
      }
    
  }
  
const Chatareapagecontroller=async(req,res,next)=>{
    res.send("your are in the chat area page");
    console.log("you are in chat area page");
}
exports.ChatareapagecontrollerSetAvatar=ChatareapagecontrollerSetAvatar;
exports.Chatareapagecontroller=Chatareapagecontroller;