'use client'
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import micro from "../photos/MB Logo White.png"

export function Navbar({
  logout,
  user,
  key,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) {

 useEffect(() => {
  
 }, [key])

  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal);
  const [drope, setdrope] = useState(false)
  const toggleCart = () => {
    if (ref.current !== null) {
      if (ref.current.classList.contains("hidden")) {
        ref.current.classList.remove("hidden");
      } else if (!ref.current.classList.contains("hidden")) {
        ref.current.classList.add("hidden");
      }
    }
  };
  const ref = useRef<HTMLDivElement>(null);
  const dologout= () =>{
    logout()
      setTimeout(() => {
        
        toast.success('Logged out Successfully', {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }, 500);
    
    
  }
  return (
    <div>
      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <div className="navbar bg-base-100 fixed z-50 shadow-2xl">
        <div className="navbar-start">
          <Link href='/'><Image className="pl-5" src={micro} alt="" width={135} height={135}></Image></Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              {<Link href={'/tshirt'}>Tshirts</Link>}
            </li> 
            <li>
              {<Link href={'/hoodies'}>Hoodies</Link>}
            </li> 
            <li>
              {<Link href={'/mugs'}>Mugs</Link>}
            </li>
            <li>
              {<Link href={'/stickers'}>Tshirts</Link>}
            </li>  
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div onClick={toggleCart} className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              ref={ref}
              tabIndex={0}
              className="mt-3 z-[1] hidden card card-compact dropdown-content w-52 bg-base-100 shadow "
            >
              <div className="card-body ">
                <IoIosCloseCircle
                  onClick={toggleCart}
                  className="mx-40 cursor-pointer text-xl"
                />
                <span className="font-bold text-lg">8 Items</span>
                <ol>
                  {Object.keys(cart).length == 0 && (
                    <div className="font-bold">Cart is Empty !!</div>
                  )}
                  {Object.keys(cart).map((k) => {
                    return (
                      <li key={k}>
                        <div className="flex">
                          <div className="w-1/6">1</div>
                          <div className="w-1/2">
                            {cart[k].name} ({cart[k].size} / {cart[k].varient})
                          </div>
                          <div className=" flex justify-center items-center w-2/6">
                            <FaCircleMinus
                              onClick={() => {
                                removeFromCart(
                                  k,
                                  1,
                                  cart[k].price,
                                  cart[k].name,
                                  cart[k].size,
                                  cart[k].varient
                                );
                              }}
                              className="mx-1 cursor-pointer"
                            />
                            {cart[k].qty}
                            <FaCirclePlus
                              onClick={() => {
                                addToCart(
                                  k,
                                  1,
                                  cart[k].price,
                                  cart[k].name,
                                  cart[k].size,
                                  cart[k].varient
                                );
                              }}
                              className="mx-1 cursor-pointer"
                            />
                          </div>
                        </div>
                        <br />
                      </li>
                    );
                  })}
                </ol>
                <span className="text-info">₹{subTotal}</span>
                <div className="card-actions flex">
                  <div className="flex">
                    <button className="btn w-1/2 btn-primary btn-block mr-1">
                      <Link href={"/checkout"}>View cart</Link>
                    </button>
                    <button
                      onClick={clearCart}
                      className="btn w-1/2 btn-primary btn-block ml-1"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
          
            {user.value && (
               <div className="dropdown dropdown-end">
              <MdAccountCircle onClick={()=>{setdrope(!drope)}} role="button" tabIndex={0} className="text-3xl m-1 mt-2" />
                
                {drope && <div className="">
               <ul  tabIndex={0} className="menu dropdown-content z-[1] p-2 mt-5 shadow bg-base-100 rounded-box w-52 mt-4">
                 <li><button className="font-bold btn btn-active mb-3 hover:text-gray-100 btn-accent"><Link href={'/myaccount'}>My Account</Link></button></li> 
                 <li><button className="font-bold btn btn-active mb-3 hover:text-gray-100 btn-secondary"><Link href={'/orders'}>My Orders</Link></button></li>
                 <li><button onClick={dologout} className="font-bold btn btn-active mb-3 hover:text-gray-100 btn-error">Logout</button></li>
               </ul>
               </div>}
             </div>
            )}
            {!user.value && (
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <Link href={"/login"}>
                    <RiLoginCircleFill className="text-3xl" />
                  </Link>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
