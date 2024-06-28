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
      let products = await product.find()
      res.status(200).json({ products });
  }
  

export default connectDB(handler)