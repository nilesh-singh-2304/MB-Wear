// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import product from "@/model/product";
import connectDB from "@/middleware/mongoose";

type Data = {
  name: string;
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
  )=> {
    if(req.method == 'POST'){
        for (let i = 0; i < req.body.length; i++) {
            let p = new product({
                title: req.body[i].title,
                slug: req.body[i].slug,
                desc: req.body[i].desc,
                image: req.body[i].image,
                category: req.body[i].category,
                size: req.body[i].size,
                color:req.body[i].color,
                price: req.body[i].price,
                availableQty: req.body[i].availableQty,
            })
            await p.save();
        }
        res.status(200).json({ success:"Added successfully" });
        
    }
    else{
        res.status(400).json({ error : "This method is not allowed" });
    }
      
  }
  

export default connectDB(handler)