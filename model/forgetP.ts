import { Types } from "mongoose";
import { Schema, model } from "mongoose";
const mongoose = require("mongoose");

const ForgetPSchema = new Schema(
  {
    userId: {type: String , required:true},
    email: {type: String , required:true , unique:true},
    token: {type: String , required:true},
  },
  { timestamps: true }
); //timestamp true krn se created at , updated at , etc functionalities kaam krn lgti h

mongoose.models = {}; //isk bina product cant be overwrite ka error aa jyega
export default mongoose.model("Order", ForgetPSchema);
