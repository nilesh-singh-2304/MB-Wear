import React from 'react'
import Image from 'next/image'
import ordcon from "../photos/orderConf.png"
import { useRouter } from 'next/router'
import mongoose from "mongoose";
import Order from '@/model/order';
import Head from 'next/head';

const order = ({products}) => {
  const router = useRouter()
  const {id} = router.query
  // console.log(products)
  const Prod = products.products
  const date = new Date(products.createdAt)
  return (
    <div>
      <Head>
      <title>{`#${products.orderId} - MBwear.com`}</title>
    </Head>
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 font-bold tracking-widest">HYENA ENTERPRICES</h2>
        <h1 className="text-white text-3xl title-font font-medium mb-4">{`Order ID : #${products.orderId}`}</h1>
        <p className="leading-relaxed font-semibold mb-4">{`Your Payment Status is : ${products.paymentInfo}`}</p>
        <p className="leading-relaxed font-normal mb-4">{`Order Placed on  :  ${date.toLocaleDateString("en-US" , {weekday:"long" ,year:"numeric" , month:"long" , day:"numeric" ,hour:"numeric" ,minute:"numeric" })}`}</p>
        <div className="divider"></div> 
        <div className="flex  py-2">
          <span className=" font-bold  w-1/3  text-secondary">Item</span>
          <span className='m-auto  w-1/3  font-bold text-secondary'>Quantity</span>
          <span className=" m-auto  w-1/3   font-bold text-secondary">Price</span>
        </div>

        {Object.keys(Prod).map((key)=>{
         
          return <div key={key} className="flex border-t border-gray-800 py-2">
          <span className="text-gray-500 w-1/3"> {Prod[key].name}</span>
          <span className='m-auto w-1/3'>{Prod[key].qty}</span>
          <span className="m-auto w-1/3 text-white">{`₹${Prod[key].price * Prod[key].qty}`}</span>
        </div>
        })}

        <div className="divider"></div> 
        <div className="flex justify-between">
          <span className="title-font font-medium text-3xl pt-2 text-white">{`Subtotal : ₹${products.amount} `}</span>
          <button className="btn btn-secondary">Track Order</button>
        </div>
      </div>
      
      <Image className='sm:ml-20 mt-10' src={ordcon} alt='' width={500} height={400}/>
    </div>
  </div>
</section>
    </div>
  )
}

export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
}
  let products = await Order.findOne({orderId : context.query.id})
 
  // console.log(context.query.slug)
    
  return{
    props:{products: JSON.parse(JSON.stringify(products))} // will be passed to page components as props
  }                  //jsonparse and then json stringify krn se object deep copy ho jaaata h , ye na krn p product serialise nhi ho paa rha tha
}

export default order
