const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/mybotDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database. Message collection');
});

const messageSchema = new mongoose.Schema({
  fromUserName: {
    type: String,
    required: true
  },
  toUserName: {
    type: String,
    minlength: 3,
    required: true
  },
  fromUserEmail: {
    type: String,
    required: true
  },
  toUserEmail: {
    type: String,
    required: true
  },
  message: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const MessageModel = new mongoose.model("messageCollection", messageSchema);
module.exports = MessageModel;
