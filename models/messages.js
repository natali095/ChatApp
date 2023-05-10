const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  message: { type: String, required: true }, // Updated field name from 'msg' to 'message'
});

const Msg = mongoose.model('msg', msgSchema, 'message');
module.exports = Msg;
  
  