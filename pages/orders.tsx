import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from "axios";
import Head from 'next/head';

const orders = () => {
  const router = useRouter()
  const [Orders, setorders] = useState([])
    useEffect( () => {
        const fetchOrders = async()=>{
            let a = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/myOrders` , {
                token : localStorage.getItem('token')
              })
              let res = await a.data
              setorders(res.orders) 
            //   console.log(res.orders)
        }
        if(!localStorage.getItem('token')){
            router.push('/')                 //agr user already logged in h toh use login page nhi dikhayenge
          }
          else{
            fetchOrders()
            } 
    }, [])
  return (
    <div className='min-h-screen' >
        <Head>
      <title>{`Your Orders - MBwear.com`}</title>
    </Head>
      <div className='container w-full text-center font-bold text-3xl pt-20'>
        My Orders
      </div>
      <div className="divider px-20"></div> 
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg sm:mx-10 pb-6">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className=" text-secondary px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className=" text-secondary px-6 py-3">
                    Product
                </th>
                
                <th scope="col" className=" text-secondary px-6 py-3">
                    Price
                </th>
                <th scope="col" className=" text-secondary px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>

            {Orders.map((item)=>{
                return <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                    <img src="/docs/images/products/apple-watch.png" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {`#${item.orderId}`}
                </td>
                
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {`₹${item.amount}`}
                </td>
                <td className="px-6 py-4">
                    <Link className='text-secondary' href={`/order?id=${item.orderId}`}>Details</Link>
                </td>
            </tr>

            })}

            
            
        </tbody>
    </table>
</div>

    </div>
  )
}

// export async function getServerSideProps(context){
//   if(!mongoose.connections[0].readyState){
//     await mongoose.connect(process.env.MONGO_URI)
// }
//       // yha pr hm local storage read nhi kr skte isliye hm alg s myorders.ts naam ki api bnayenge
    
//   return{
//     props:{orders:JSON.parse(JSON.stringify(orders))} // will be passed to page components as props
//   }                  //jsonparse and then json stringify krn se object deep copy ho jaaata h , ye na krn p product serialise nhi ho paa rha tha
// }


export default orders
