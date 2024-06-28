import type { NextApiRequest, NextApiResponse } from "next";
import Order from "@/model/order";
import connectDB from "@/middleware/mongoose";
var jwt = require('jsonwebtoken');


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
  )=> {
        const token = req.body.token
        const data = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        let orders = await Order.find({email : data.email , status:'Paid'})  
        res.status(200).json({orders});
      
  }
  

export default connectDB(handler)