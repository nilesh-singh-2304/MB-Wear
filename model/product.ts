import { Types } from 'mongoose';
import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');

const ProductSchema = new Schema({
    title: {type: String , required:true},
    slug: {type: String , required:true , unique:true},
    desc: {type: String , required:true},
    image: {type: String , required:true},
    category: {type: String , required:true},
    size: {type: String },
    color: {type: String},
    price: {type: Number , required:true},
    availableQty: {type: Number , required:true},
  } , {timestamps:true});    //timestamp true krn se created at , updated at , etc functionalities kaam krn lgti h

  mongoose.models = {} //isk bina product cant be overwrite ka error aa jyega 
  export default mongoose.model("Product" , ProductSchema)
