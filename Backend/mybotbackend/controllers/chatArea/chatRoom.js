const ExistingUser = require("../../modals/authenticationSchema/login_schema");
const NewSignupToUser = require("../../modals/authenticationSchema/signup_schema");
const HttpError = require("../../modals/error");
const jwt = require("jsonwebtoken");
const AvatarModel=require("../../modals/authenticationSchema/avatarSchema");
const MessageModel=require("../../modals/authenticationSchema/MessageSchema");
const bcrypt = require("bcrypt");


const ChatareapagecontrollerChatRoom=async(req,res,next)=>{
try{
    
const dataPayload= AuthenticateToken(req.cookies.jwtoken);
if(dataPayload==0){
    return;
}
console.log( "dataPayloads tokenid :" +  dataPayload.TokenId + "name " + dataPayload.Name + " id "+ dataPayload._id);
const response = await AvatarModel.findOne({Email  : dataPayload.Email});

if(response){
console.log("user found sending to the chatroom" + response);
res.send(response);
}
else{
    console.log("error in 404 chatRoom");
    res.send(null)
}
}catch(err){
    console.log("error 500 in chatRoom" + err);
}

}
const ExistingUserSearch = async (req, res, next) => {
  const { newEmail } = req.body;
  console.log("the user's email: " + newEmail);
  const existingUser = await AvatarModel.findOne({ Email: newEmail });

  if (existingUser !== null) {
    console.log("The user is already registered. You can add them.");
    console.log(existingUser);
    res.status(200).send(existingUser);
  } else {
    console.log("The user is not registered. You cannot add them.");
    res.status(404).send(0);
  }
};


const AddNewUserToExistingUsers=async(req,res,next)=>{
  const {currentUser, userToBeAdded}= req.body;
console.log( currentUser + "la illa " + userToBeAdded);
try{

  const existingUser = await AvatarModel.findOne({ Email: currentUser });
      // Check if userToBeAdded is already in the Users array
      if (existingUser.Users.includes(userToBeAdded)) {
        console.log("new user to be added already exist");
        console.log(existingUser)
        return res.json(existingUser);
      }
  
const updatedUser = await AvatarModel.findOneAndUpdate(
  { Email: currentUser },
  { $push: { Users: userToBeAdded } },
  { new: true }
);


if (!updatedUser) {
  console.log("error in adding the new user ");
  return res.status(404).json({ error: "User not found." });
}
else{
  console.log(updatedUser);
  res.json(updatedUser);
}
}catch(err){
  console.log("error is " + err);
  res.send(err);
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


  const MessageTransfer=async(req,res,next)=>{
    
    console.log("message is fetching");
    const {message, fromUser,toUser}= req.body;
    console.log(message);
    console.log(fromUser);
    console.log(toUser);
     const saveMessageToDatabase = await new MessageModel({
      fromUser,
      toUser
     })
  }
  exports.ExistingUserSearch=ExistingUserSearch;
  exports.AddNewUserToExistingUsers=AddNewUserToExistingUsers;
exports.ChatareapagecontrollerChatRoom=ChatareapagecontrollerChatRoom;
exports.MessageTransfer=MessageTransfer;