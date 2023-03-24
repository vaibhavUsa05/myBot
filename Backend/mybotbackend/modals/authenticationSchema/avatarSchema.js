const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/mybotDatabase', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log('Connected to MongoDB database. Avatar collection');
});
const avatarModel = new mongoose.Schema({
  TokenId:{
     type:String,
     required:true
  },
  Name: {
    type: String,
    minlength: 3,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Avatar: {
    type:String,
    required: true
  },
  Users:{
    type: Array
  }
});

const AvatarModel=new mongoose.model("AvatarSchema",avatarModel);
module.exports=AvatarModel;