import type { NextApiRequest, NextApiResponse } from "next";
import ForgetP from "@/model/forgetP";
import connectDB from "@/middleware/mongoose";
import User from "@/model/user";
const  handler =async (
  req: NextApiRequest,
  res: NextApiResponse,
) =>  {

    //check if the user exists 
    //send an email to the user

    if(req.body.sendMail){
        let token = 'dsbvhviufopfeoivjhuif45ihuifgver'
    let forget = new ForgetP({
        email : req.body.email,
        token : token
    })

    let email =`We have sent you this email in response to your request to reset your password on MBwear.com .
                To reset your password for , please follow the link below:

                <a href="https://MBwear.com/forgetPass?token=${token}">Click here to reset </a>


                We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and clicking on the "Change Email Address or Password" link.`
                res.status(200).json({ success:"Added successfully" });
    }
    else{

    }
}
export default connectDB(handler)