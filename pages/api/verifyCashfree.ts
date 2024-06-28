import { Cashfree } from "cashfree-pg"
import { error } from "console";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function GET(req:NextApiRequest , res: NextApiResponse){
    try {

        let {orderId} = req.body

        Cashfree.PGOrderFetchPayments("2023-08-01" , orderId).then((response) =>{
            console.log("Payment Verified")
            return res.status(200).json({msg : "Payment Verified"})
        }).catch(error =>{
            console.error(error.response.data.message)
        })

    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}