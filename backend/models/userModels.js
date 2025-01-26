const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  interest: {
    type: [String],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    requred: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
