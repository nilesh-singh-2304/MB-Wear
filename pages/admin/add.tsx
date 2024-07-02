import React, { useState } from 'react'
import Image from 'next/image'
import { MdDashboardCustomize } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { FaEye } from "react-icons/fa"
import { FaFileUpload } from "react-icons/fa";
import { IoBagCheckSharp } from "react-icons/io5";
import Link from 'next/link';
import micro from "../../photos/MB Logo White.png"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { color } from 'framer-motion';
import { title } from 'process';


const Add = () => {

    interface bodyData{
        title:string;
        Price : number;
        email : string;
        phone : string;
        cart : Object
        pincode : String
    }
    

   const [form, setform] = useState({title:null , size:null, availableQty:null , image:null , color:null , slug:null , price:null , category:null , desc :null })
   const onChange = (e) =>{
    setform({
        ...form,
        [e.target.name] : e.target.value 
    })
    console.log(form)
   }

   const onSubmit = async(e)=>{
        e.preventDefault()
        let a = await  axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts` , {
           title : form.title,
           size : form.size,
           availableQty : form.availableQty,
           image : form.image,
           color : form.color,
           slug : form.slug,
           price : form.price,
           category : form.category,
           desc : form.desc
        })
        let resp = a.data
        if(resp.success){
            setTimeout(() => {
                toast.success('Item added successfully !!', {
                  position: "bottom-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              
              }, 100);
        }
        else{
            setTimeout(() => {
                toast.error('Not able to add product', {
                  position: "bottom-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              
              }, 100);
        }
       
   }

  return (
    <div className='pt-16'>
        <ToastContainer limit={2} position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
         <style jsx global>{`
         navbar{
           display: none;
         }
        footer{
          display: none;
        }
      `}</style>
       

<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start rtl:justify-end">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
         <Link href='/'><Image className="pl-5" src={micro} alt="" width={135} height={135}></Image></Link>
      </div>
      <div className="flex items-center">
          <div className="flex items-center ms-3">
            <div>
              <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
              </button>
            </div>
            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 dark:text-white" role="none">
                  Neil Sims
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>

<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div className="h-full px-3 pb-4 pt-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
         <li>
            <Link href="/admin" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <MdDashboardCustomize className='text-3xl' />
               <span className="ms-3">Dashboard</span>
            </Link>
         </li>
         <li>
            <Link href={"/admin/add"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <MdAddBox className='text-3xl' />
               <span className="flex-1 ms-3 whitespace-nowrap">Add Product</span>
               <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
            </Link>
         </li>
         <li>
            <Link href="/admin/allproducts" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FaEye className='text-3xl' />
               <span className="flex-1 ms-3 whitespace-nowrap">View Products</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </Link>
         </li>
         <li>
            <Link href="/admin/imageuploader" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FaFileUpload className='text-3xl' />
               <span className="flex-1 ms-3 whitespace-nowrap">Image Uploader</span>
            </Link>
         </li>
         <li>
            <Link href="/admin/allorders" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <IoBagCheckSharp className='text-3xl' />
               <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
            </Link>
         </li>
      </ul>
   </div>
</aside>

<div className="p-4 sm:ml-64">
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      {/* <div className="grid grid-cols-3 gap-4 mb-4"> */}
      <div className=" py-6 sm:pb-8 lg:pb-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

    <div className="mb-10 md:mb-10">
      <h2 className="mb-4 text-center text-2xl font-bold text-white md:mb-6 lg:text-3xl">Add Products</h2>
    </div>
   
    <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="first-name" className="mb-2 inline-block text-sm text-gray-50 sm:text-base">Title</label>
        <input onChange={onChange} value={form.title} name="title" className="w-full rounded bg-gray-700 px-3 py-2 text-white outline-none ring-gray-800 transition duration-100 focus:ring" />
      </div>

      <div>
        <label htmlFor="last-name" className="mb-2 inline-block text-sm text-gray-50 sm:text-base">Size</label>
        <input onChange={onChange} value={form.size} name="size" className="w-full rounded bg-gray-700 px-3 py-2 text-white outline-none ring-gray-800 transition duration-100 focus:ring" />
      </div>

      <div>
        <label htmlFor="first-name" className="mb-2 inline-block text-sm text-gray-50 sm:text-base">Available Quantity</label>
        <input onChange={onChange} value={form.availableQty} name="availableQty" className="w-full rounded bg-gray-700 px-3 py-2 text-white outline-none ring-gray-800 transition duration-100 focus:ring" />
      </div>

      <div>
        <label htmlFor="last-name" className="mb-2 inline-block text-sm text-gray-50 sm:text-base">Image URL</label>
        <input onChange={onChange} value={form.image} name="image" className="w-full rounded bg-gray-700 px-3 py-2 text-white outline-none ring-gray-800 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="company" className="mb-2 inline-block text-sm text-gray-50 sm:text-base">Color</label>
        <input onChange={onChange} value={form.color} name="color" className="w-full rounded bg-gray-700 px-3 py-2 text-white outline-none ring-gray-800 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-50 sm:text-base">Slug</label>
        <input onChange={onChange} value={form.slug} name="slug" className="w-full rounded bg-gray-700 px-3 py-2 text-white outline-none ring-gray-800 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="subject" className="mb-2 inline-block text-sm text-gray-50 sm:text-base">Price</label>
        <input onChange={onChange} value={form.price} name="price" className="w-full rounded bg-gray-700 px-3 py-2 text-white outline-none ring-gray-800 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
  <select onChange={onChange} name='category' value={form.category} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Choose a country</option>
    <option value="Tshirt">Tshirt</option>
    <option value="hoodies">Hoodie</option>
    <option value="stickers">Stickers</option>
    <option value="mugs">Mugs</option>
  </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-2 inline-block text-sm text-gray-50 sm:text-base">Description</label>
        <textarea onChange={onChange} value={form.desc} name="desc" className="h-64 w-full rounded bg-gray-700 px-3 py-2 text-white outline-none ring-gray-800 transition duration-100 focus:ring"></textarea>
      </div>

      <div></div>

      <div className="flex items-center justify-between sm:col-span-2">
      <button onClick={onSubmit} className="btn btn-info">Submit</button>

        <span className="text-sm text-gray-500">*Required</span>
      </div>

      <p className="text-xs text-gray-400">By signing up to our newsletter you agree to our <a href="#" className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600">Privacy Policy</a>.</p>
    </form>
    
  </div>
</div>
     ?
      
   </div>
</div>


      </div>
  )
}

export default Add
