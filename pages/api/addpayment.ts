import type { NextApiRequest, NextApiResponse } from "next";
import Order from "@/model/order";
import connectDB from "@/middleware/mongoose";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
  )=> {
    if(req.method == 'POST'){
        
        let o = new Order({
            email : req.body.email ,
            orderId : req.body.orderId , 
            cfOrderId : req.body.cfOrderId,
            paymentInfo : req.body.paymentInfo,
            products : req.body.products,
            address : req.body.address,
            pincode : req.body.pincode,
            state : req.body.state,
            city : req.body.city,
            amount : req.body.amount,
            phone : req.body.phone,
            name : req.body.name,
            status : req.body.status
        })
        await o.save()
        res.status(200).json({ success:"Added successfully" });
        
    }
    else{
        res.status(400).json({ error : "This method is not allowed" });
    }
      
  }
  

export default connectDB(handler)