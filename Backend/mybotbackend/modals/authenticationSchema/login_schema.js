const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/mybotDatabase', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log('Connected to MongoDB database. Login collection');
});

const loginSchema=new mongoose.Schema({
    Email:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true,
},
});
const loginModel=new mongoose.model("AuthenticationLogin",loginSchema);
module.exports=loginModel;