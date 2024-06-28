// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from '@/model/user'
import connectDB from "@/middleware/mongoose";
var jwt = require('jsonwebtoken');

type Data = {
  name: string;
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
  )=> {
    if(req.method == 'POST'){
        let token = req.body.token
        let user = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        const dbuser = await User.findOne({email : user.email})
        const {name ,email , address , pincode ,phone} = dbuser
        res.status(200).json({name ,email , address , pincode , phone});
        // res.status(200).json({ user : user });
        
    }
    else{
        res.status(400).json({ error : "This method is not allowed" });
    }
      
  }
  

export default connectDB(handler)