
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY)

interface bodyData{
    name:string;
    price : number;
}

export default async function POST (req:NextApiRequest , res: NextApiResponse){
    try {
        const data:bodyData = await req.body

        const customer = await stripe.customers.create({
            email:"sk2300023@gmail.com",
            address:{
                city:'Faridabad',
                country:'India',
                line1:'A-67 Chawla Colony',
                postal_code:'121004',
                state:'Haryana'
            },
            name:'Nilesh Singh'
        })

        const checkOutSession = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            customer:customer.id,
            success_url : `${process.env.NEXT_PUBLIC_HOST}/order`,
            cancel_url : `${process.env.NEXT_PUBLIC_HOST}`,
            line_items:[{
                quantity: 1,
                price_data:{
                    product_data:{
                        name:"MB Tshirt"
                    },
                    currency:'INR',
                    unit_amount: data.price*100
                }
            }]
        })
        
        return res.status(200).json({msg:checkOutSession , url:checkOutSession.url})
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}