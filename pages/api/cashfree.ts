import { Cashfree } from "cashfree-pg"
import type { NextApiRequest, NextApiResponse } from "next";
import Product from "@/model/product";
import pincodes from "../../pincodes.json"

Cashfree.XClientId = process.env.NEXT_PUBLIC_CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.NEXT_PUBLIC_CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


const generateOrderId = () =>{
    const num = Math.floor(Math.random() * Date.now());

    let orderId = num.toString();
    return orderId

}

interface bodyData{
    name:string;
    Price : number;
    email : string;
    phone : string;
    cart : Object
    pincode : String
}

export default async function GET(req:NextApiRequest , res: NextApiResponse){
    try {

        const values:bodyData = await req.body

        //check if pincode is serviceable or not
        if(!(Object.keys(pincodes)).includes(values.pincode.toString()) ){
            return res.status(200).json({success: false , msg:"Your Pincode is not Serviceable !!" , clearCkt : false})
        }

         const cart = values.cart
        // Checking  wheather the cart has been tampered or not // and is the product item available in required quantity
        if(values.Price <= 0){
            return res.status(200).json({success: false , msg:"Your Cart is Empty" , clearCkt : false})
        }
        //checking if phone no is valid or not 
        if(values.phone.length != 10 || Number.isInteger(values.pincode)){
            return res.status(200).json({success: false , msg:"Please Enter a vaild Phone number" , clearCkt : false})
        }
        //checking if pincode is valid or not 
        if(values.pincode.length != 6 ){
            return res.status(200).json({success: false , msg:"Please Enter a vaild 6 Digit pincode" , clearCkt : false})
        }
        for (let item in cart){
            console.log(cart)
            let Prod = await Product.findOne({slug:item})
            console.log(Prod)
            if(Prod.availableQty < cart[item].qty){
                return res.status(200).json({success: false , msg:"Maybe some items are out of stock !!" , clearCkt : true})
            }
            if(Prod.price != cart[item].price){

                return res.status(200).json({success: false , msg:"Price of an item is tampered" , clearCkt : true})
                
            }
        }
        


        const Price = values.Price.toString()
        const email = values.email
        const name = values.name
        const phone = values.phone
        const orderId =await generateOrderId()

        let request = {
            "order_amount": parseInt(Price),
            "order_currency": "INR",
            "order_id" :orderId,
            "customer_details": {
              "customer_id": "node_sdk_test",
              "customer_name": name,
              "customer_email": email,
              "customer_phone": phone
            },
            "order_meta": { 
    "return_url":`${process.env.NEXT_PUBLIC_HOST}order?id=${orderId}`,
    "payment_methods" : "upi",
  }
        }

        const data = Cashfree.PGCreateOrder("2023-08-01", request).then(response =>{
            console.log(response.data)
            return res.status(200).json({success: true , response:response.data , clearCkt : false})
        })
        

    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}