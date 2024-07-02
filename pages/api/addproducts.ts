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
        
            let p = new product({
                title: req.body.title,
                slug: req.body.slug,
                desc: req.body.desc,
                image: req.body.image,
                category: req.body.category,
                size: req.body.size,
                color:req.body.color,
                price: req.body.price,
                availableQty: req.body.availableQty,
            })
            await p.save();
        
        res.status(200).json({ success:true ,prod:p});
        
    }
    else{
        res.status(200).json({ success : false });
    }
      
  }
  

export default connectDB(handler)