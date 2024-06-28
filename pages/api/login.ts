// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/model/user"
import connectDB from "@/middleware/mongoose";
import { error } from "console";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


type Data = {
  name: string;
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
  )=> {
    if(req.method == 'POST'){
        let user = await User.findOne({"email":req.body.email});
        var bytes  = CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_CRYPTO_KEY);
        if(user){
            if(req.body.email == user.email && req.body.password == bytes.toString(CryptoJS.enc.Utf8)){
              var token = jwt.sign({ success:true , email:user.email , name:user.name }, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '1d' });
                res.status(200).json({success:true, token , email:req.body.email});
        }
        else{
            res.status(200).json({ success:false , error:"Invalid Credentials" });
        }
        }
        else{
            res.status(200).json({ success:false , error:"User Not Found" });
        }
        
    }
    else{
        res.status(400).json({ error : "This method is not allowed" });
    }
      
  }
  

export default connectDB(handler)