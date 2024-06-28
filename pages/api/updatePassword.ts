import type { NextApiRequest, NextApiResponse } from "next";
import User from '@/model/user'
import connectDB from "@/middleware/mongoose";
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

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
        let dbUser = await User.findOne({email:user.email})
        var bytes  = CryptoJS.AES.decrypt(dbUser.password, process.env.NEXT_PUBLIC_CRYPTO_KEY);
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8)
        console.log(bytes)
        if(decryptedPass === req.body.password){

            const dbuser = await User.findOneAndUpdate({email : user.email} , {password:CryptoJS.AES.encrypt(req.body.newpassword, process.env.NEXT_PUBLIC_CRYPTO_KEY).toString()})
            const {name ,email , address , pincode ,phone} = dbuser
            res.status(200).json({success :true , msg:"Update Done Successfully !!"});
        }
        else{
            console.log(decryptedPass)
            res.status(200).json({success :false , msg:"Please Enter Correct Current Password"});
        }
        // res.status(200).json({ user : user });
        
    }
    else{
        res.status(400).json({ error : "This method is not allowed" });
    }
      
  }
  

export default connectDB(handler)