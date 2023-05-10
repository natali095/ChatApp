const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  msg: { type: String, required: true },
});


const Msg = mongoose.model('msg', msgSchema, 'message');
module.exports = Msg;   



  
  