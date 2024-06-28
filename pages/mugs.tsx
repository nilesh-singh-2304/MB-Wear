import React, { useEffect, useState } from "react";
import { FlipWords } from "../ui/wordRotate";
import Heroi from "../photos/tshirth.png";
import Mug from "../photos/mug.png"
import Image from "next/image";
import Link from "next/link";
import product from "@/model/product";
import mongoose from "mongoose";
import Head from "next/head";
import { Router, useRouter } from 'next/router';


const Mugies = () => {
  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem('token')){
      router.push('/')                 //agr user already logged in h toh use login page nhi dikhayenge
    }
  }, [])
  return (
    // <div>
    //    <Head>
    //   <title>{`Mugs - MBwear.com`}</title>
    // </Head>
    //    <div className='flex pt-32 pb-10 invisible md:visible'>
    //     <div className='w-8/12 flex-col justify-center items-center px-40 text-4xl font-bold text-neutral-600 dark:text-neutral-400'>
    //     <div className='flex '>
    //      <div className='mr-5 pb-3'>Become</div>
    //     <div className='font-extrabold text-red-500'>
    //     <FlipWords words={["better", "cute", "beautiful", "modern"]} />
    //     </div>
    //     </div>
    //     <div>with faishon wears at MICROBIRD !!</div>
    //     <div className=' mt-8 justify-center items-center '>Get T-shirts with your name <br/><br/> <Image width={500} height={500} src={Mug} alt=''/> </div>
    //     </div>


    //     <div className='scale-150 pt-14'>
    //       <Image width={300} height={300} src={Heroi} alt=''/>
    //     </div>
    //   </div>

    //   <div className=" py-6 sm:py-8 lg:py-12">
    //     <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    //       <div className="mb-6 flex items-end justify-center gap-4">
    //         <h2 className="text-2xl font-bold text-center text-gray-500 lg:text-3xl">
    //           Our Collection
    //         </h2>
    //       </div>

    //       <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
    //         {Object.keys(products).length === 0 && <div className="w-screen font-extrabold pr-20 text-center">Currently all the mugies are out of stock !! Stay Tuned for upcoming stock !!</div>}
    //         {Object.keys(products).map((item)=>{ 
    //           return <div key={products[item]._id}>
    //           <Link href={`/product/${products[item].slug}`}>
    //             {" "}
    //             <span className="group relative mb-2 block h-80 overflow-hidden rounded-lg bg-white lg:mb-3">
    //               <Image
    //               loader={() => products[item].image}
    //                 src={products[item].image}
    //                 loading="lazy"
    //                 width={200}
    //                 height={200}
    //                 alt="Photo by Fakurian Design"
    //                 className="h-full w-full object-contain object-top transition duration-200 group-hover:scale-110"
    //               ></Image>
    //             </span>
    //           </Link>

    //           <div>
    //             <Link href={`/product/${products[item].slug}`}>
    //               <span className="hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg">
    //                 {products[item].title}
    //               </span>
    //             </Link>

    //             <div className="font-medium">
    //               {products[item].size.includes('S') && <span className="border mr-2 px-1">S </span>}
    //               {products[item].size.includes('M') && <span className="border mr-2 px-1"> M </span>}
    //               {products[item].size.includes('L') && <span className="border mr-2 px-1"> L </span>}
    //               {products[item].size.includes('XL') && <span className="border mr-2 px-1"> XL </span>}
    //               {products[item].size.includes('XXL')&& <span className="border mr-2 px-1"> XXL </span>}
    //             </div>

    //             <div className="font-medium mt-2">
    //               {products[item].color.includes('red') && <button className="border-2 border-gray-800 mr-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
    //               {products[item].color.includes('white') && <button className="border-2 border-gray-800 mr-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
    //               {products[item].color.includes('yellow') && <button className="border-2 border-gray-800 mr-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
    //               {products[item].color.includes('blue') && <button className="border-2 border-gray-800 mr-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
    //               {products[item].color.includes('purple')&& <button className="border-2 border-gray-800 mr-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>}
    //               {products[item].color.includes('gray')&& <button className="border-2 border-gray-800 mr-1 bg-gray-500 rounded-full w-6 h-6 focus:outline-none"></button>}
    //             </div>

    //             <div className="flex items-end gap-2">
    //               <span className="font-bold text-gray-400 lg:text-lg">
    //               ₹{products[item].price}
    //               </span>
    //             </div>
    //           </div>
    //         </div>})}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="pt-24">Hello</div>
  );
};
// export async function getServerSideProps(context){
//   if(!mongoose.connections[0].readyState){
//     await mongoose.connect(process.env.MONGO_URI)
// }
//   let products = await product.find({category:"mugs"})
//   let mug = {}
//       for(let item of products){
//         if(item.title in mug){
//           if(!mug[item.title].color.includes(item.color) && item.availableQty > 0){
//             mug[item.title].color.push(item.color)
//           }
//           if(!mug[item.title].size.includes(item.size) && item.availableQty > 0){
//             mug[item.title].size.push(item.size)
//           }
//         } 
//         else{
//           mug[item.title] = JSON.parse(JSON.stringify(item))     //initially mug empty h so hmne mug with title=item.title m item ko deep copy kr dio
//           if(item.availableQty >0){                                 //agr item ki available qty 0 is zda h toh mug with title=item.title k color ko ek array bna do and usk ander item.color ko add krdo and same with size
//             mug[item.title].color = [item.color]
//             mug[item.title].size = [item.size]
//           }
//         }
//       }
    
//   return{
//     props:{products: JSON.parse(JSON.stringify(mug))} // will be passed to page components as props
//   }                  //jsonparse and then json stringify krn se object deep copy ho jaaata h , ye na krn p product serialise nhi ho paa rha tha
// }

export default Mugies;
