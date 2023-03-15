const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    courses:{
        type: [Schema.Types.Array],
        default: []
        
    }
  });
  const User = mongoose.model('user', UserSchema);
  module.exports = User;