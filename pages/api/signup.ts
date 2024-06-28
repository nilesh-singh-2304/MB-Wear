// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/model/user"
import connectDB from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

type Data = {
  name: string;
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
  )=> {
    if(req.method == 'POST'){
        const {name,email} = req.body
        let u = new User({name , email , password:CryptoJS.AES.encrypt(req.body.password, process.env.NEXT_PUBLIC_CRYPTO_KEY).toString()})
        await u.save()
        res.status(200).json({ success:"Added successfully" });
        
    }
    else{
        res.status(400).json({ error : "This method is not allowed" });
    }
      
  }
  

export default connectDB(handler)