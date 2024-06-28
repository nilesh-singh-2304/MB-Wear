import { Types } from 'mongoose';
import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');

const UserSchema = new Schema({
    name: {type: String , required:true},
    email: {type: String , required:true , unique:true},
    password: {type: String , required:true},
    address: {type: String , default:'' },
    pincode: {type: String , default:'' },
    phone: {type: String , default:'' },
  } , {timestamps:true});    //timestamp true krn se created at , updated at , etc functionalities kaam krn lgti h

  mongoose.models = {} //isk bina product cant be overwrite ka error aa jyega 
  export default mongoose.model("User" , UserSchema)
