import type { NextApiRequest, NextApiResponse } from "next";
import Product from "@/model/product";
import connectDB from "@/middleware/mongoose";
import mongoose from "mongoose";

type Data = {
  name: string;
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
  )=> {
    if(req.method == 'POST'){
        const cart = req.body.cart

        for(let item in cart){
            let Prod = await Product.findOne({slug:item})
            let currQty = Prod.availableQty
            console.log(currQty)
            console.log(cart[item].qty)
            let updProd = await Product.findOneAndUpdate({slug:item} , {availableQty : currQty-cart[item].qty})
        }
        res.status(200).json({ success:"Added successfully" });
        
    }
    else{
        res.status(400).json({ error : "This method is not allowed" });
    }
      
  }
  

export default connectDB(handler)