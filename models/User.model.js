const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
   {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    rol: {
      type: String,
      enum: ["guia", "usuario"],
      default: "usuario",
    },
   
    image:{
        type:String,
    }
  }
);

  const User = model("User", userSchema);

  module.exports = User;
