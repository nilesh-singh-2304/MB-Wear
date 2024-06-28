import { Types } from "mongoose";
import { Schema, model } from "mongoose";
const mongoose = require("mongoose");

const OrderSchema = new Schema(
  {
    email: { type: String, required: true },
    orderId : {type : String  , required : true},
    paymentInfo: {type : String },
    products: {type : Object , required : true},
    address: { type: String, required: true },
    cfOrderId: { type: String, required: true },
    pincode : { type: String, required: true },
    state : { type: String, required: true },
    city : { type: String, required: true },
    phone : { type: String, required: true },
    name : { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
  },
  { timestamps: true }
); //timestamp true krn se created at , updated at , etc functionalities kaam krn lgti h

mongoose.models = {}; //isk bina product cant be overwrite ka error aa jyega
export default mongoose.model("Order", OrderSchema);
