'use client'
import Link from "next/link";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'
import { Router, useRouter } from 'next/router';
import axios from "axios";
import {load} from "@cashfreepayments/cashfree-js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";

const checkout = ({
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const Router = useRouter()

  const [name, setname] = useState<string | null>('')
  const [Email, setEmail] = useState<string | null>('')
  const [Phone, setPhone] = useState<string | null>('')
  const [Pincode, setPincode] = useState<string | null>('')
  const [Address, setAddress] = useState<string | null>('')
  const [City, setCity] = useState(null)
  const [State, setState] = useState(null)
  const [Disabled, setDisabled] = useState(true)

  useEffect( () => {
    if(localStorage.getItem('token')){
      setEmail(localStorage.getItem('email'))
      FetchData()
    }
    else if(!localStorage.getItem('token')){
      Router.push('/login')
      setTimeout(() => {
        toast.warning('Please Login First !!', {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }, 1000);
    }
  }, [])

  useEffect(() => {
    if(name.length>3 && Phone.length >3 && Address.length >3 && Pincode.length >3){
      setDisabled(false)
    }
    else{
      setDisabled(true)
    }
  }, [name , Phone , Address , Pincode])

  const FetchData = async()=>{
    let a = await  axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getUser` , {
      token : localStorage.getItem('token') ,
    })
    let resp = a.data
    // console.log(resp)
    setname(resp.name)
    setAddress(resp.address)
    setPincode(resp.pincode)
    setPhone(resp.phone)
    GetPincode(resp.pincode)
  }

  const GetPincode = async(pin) =>{
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        if(Object.keys(pinJson).includes(pin)){
          setCity(pinJson[pin][0])
          setState(pinJson[pin][1])
        }
        else{
          setState('')
          setCity('')
        }
  }

  const HandleChange = async (e)=>{

    if(e.target.name == 'name'){
      setname(e.target.value)
    }
    else if(e.target.name == 'address'){
      setAddress(e.target.value)
    }
    else if(e.target.name == 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name == 'phone'){
      setPhone(e.target.value)
    }
    else if(e.target.name == 'pincode'){
      setPincode(e.target.value)
      if(e.target.value.length == 6 ){
        GetPincode(e.target.value)
      }
      else{
        setState('')
        setCity('')
      }
    }
    else if(e.target.name == 'city'){
      setCity(e.target.value)
    }
    else if(e.target.name == 'state'){
      setState(e.target.value)
    }

    }

  let cashfree;
  let initialize = async() =>{
    cashfree = await load({
      mode : "sandbox",
    })
  }
  initialize();


  const HandleCashFree = async() =>{
    try {
      let sessionId;
      let orderId;
      let cfOrderId;
      let clrCkt;
      let res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/cashfree` , {
        name : name,
        Price : subTotal,
        email : Email,
        phone : Phone,
        cart : cart,
        pincode :Pincode
      })
      if(res.data.success){
        if(res.data.response && res.data.response.payment_session_id){
          // console.log(res.data)
          orderId = res.data.response.order_id
          cfOrderId = res.data.response.cf_order_id
          sessionId = res.data.response.payment_session_id
          clrCkt = res.data.clearCkt
        }
  
        let checkoutOptions = {
          paymentSessionId : sessionId,
          redirectTarget : "_modal",
          appearance: {
            width: "425px",
            height: "700px",
        },
        }
  
        let returnUrl = res.data.response.order_meta.return_url
        
  
        await cashfree.checkout(checkoutOptions).then(async (res) =>{
          // console.log("payment success")
          if (res.error) {
            // This will be true when there is any error during the payment
            // console.log("There is some payment error, Check for Payment Status");
            console.log(res.error);
            toast.error('Payment Unsuccessful !!', {
              position: "bottom-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setTimeout(() => {
              Router.push(process.env.NEXT_PUBLIC_HOST)
            }, 2000);
  
            axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/addpayment` , {
              email : Email ,
              orderId : "Order Not Generated" , 
              cfOrderId : cfOrderId,
              paymentInfo : 'User Didnt Paid the Amount',
              products : cart,
              address : Address,
              pincode : Pincode,
              amount : subTotal,
              state : State,
              city : City,
              phone : Phone,
              name : name,
              status : 'Unpaid'
            })
            console.log(res.error.message)
          }
          if (res.paymentDetails) {
            // This will be called whenever the payment is completed irrespective of transaction status
  
  
            // console.log("Payment has been completed, Check for Payment Status");

            let verific = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/verifyCashfree` , {
              orderId : orderId
            })
            await toast.success(verific.data.msg, {
              position: "bottom-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/updateAfterPayment` , {
              cart: cart
            })

            if(clrCkt){
              await clearCart()
            }

            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/addpayment` , {
              email : Email ,
              orderId : orderId , 
              cfOrderId : cfOrderId,
              paymentInfo : 'Payment Completed',
              products : cart,
              address : Address,
              pincode : Pincode,
              amount : subTotal,
              state : State,
              city : City,
              phone : Phone,
              name : name,
              status : 'Paid'
            })
            
            await Router.push(returnUrl).then()
            
  
            setTimeout(() => {
              toast.success('Payment Successful !!', {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            
            }, 2000);
  
            
  
            // console.log(res.paymentDetails.paymentMessage);
  
          }
        });
      }
      else{
        if(res.data.clearCkt){
          await clearCart()
        }
        setTimeout(() => {
          toast.info(res.data.msg, {
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
        setTimeout(() => {
          Router.push(`${process.env.NEXT_PUBLIC_HOST}/checkout`)
        }, 2000);
      }
    } catch (error:any) {
      console.log({msg:error.error})
    }
  }

  const CheckoutBtn = async()=>{
    try {
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/route` , {
        name : 'paytm',
        price : subTotal
      })
      const respData = await resp.data;
      Router.push(respData.url);
      // console.log({respData})
    } catch (error:any) {
      // console.log({msg:error.error})
    }
  }

  

  return (
    <>
    <Head>
      <title>Checkout - MBwear.com</title>
    </Head>
    <div className="m-auto">
       <ToastContainer limit={2} position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        <div className="font-bold text-3xl text-center pt-20 mb-10">
          Checkout
        </div>
        <div className="divider px-20"></div>
        <div className="font-bold text-2xl text-center mb-10">
          Dilevery Details
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-5 sm:mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-400"
                >
                  Name
                </label>
                <input
                  onChange={HandleChange}
                  value={name}
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-400"
                >
                  Email
                </label>
                {user.value? <input
                  onChange={HandleChange}
                  value={user.email}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                /> : <input
                onChange={HandleChange}
                value={Email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />}
                
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="address"
                  className="leading-7 text-sm text-gray-400"
                >
                  Address
                </label>
                <textarea
                  onChange={HandleChange}
                  value={Address}
                  id="address"
                  name="address"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="phone"
                  className="leading-7 text-sm text-gray-400"
                >
                  Phone No.
                </label>
                <input
                  onChange={HandleChange}
                  placeholder="10 Digit Phone No."
                  value={Phone}
                  type="phone"
                  id="phone"
                  name="phone"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="pincode"
                  className="leading-7 text-sm text-gray-400"
                >
                  Pincode
                </label>
                <input
                  onChange={HandleChange}
                  value={Pincode}
                  type="number"
                  id="pincode"
                  name="pincode"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="state"
                  className="leading-7 text-sm text-gray-400"
                >
                  Your State
                </label>
                <input
                  onChange={HandleChange}
                  value={State}
                  type="text"
                  id="state"
                  name="state"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-400"
                >
                  Your City
                </label>
                <input
                  onChange={HandleChange}
                  value={City}
                  type="text"
                  id="city"
                  name="city"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="divider px-20"></div>
        <div className="font-bold text-2xl text-center mb-10">
          Review Cart Items
        </div>
        <div className="card-body sm:mx-80 ">
          <ol>
            {Object.keys(cart).length == 0 && (
              <div className="font-bold">Cart is Empty !!</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="flex">
                    <div className="w-1/6 font-bold">1</div>
                    <div className="w-1/2 font-bold">
                      {cart[k].name} ( {cart[k].varient} / {cart[k].size} )
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
                      <span className="mx-3">{cart[k].qty}</span>
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
                  <div className="divider "></div>
                </li>
              );
            })}
          </ol>
          <span className="w-full text-center font-bold text-info">Subtotal : ₹{subTotal}</span>
          <div className="card-actions flex">
            <div className="flex">
              <button disabled = {Disabled} onClick={CheckoutBtn} className=" btn btn-accent btn-block mr-1">
                <Link href={"/checkout"}>Pay ₹{subTotal}</Link>
              </button>
              <button disabled = {Disabled} onClick={HandleCashFree} className=" btn btn-accent btn-block mr-1">
                <Link href={"/checkout"}>Pay by UPI</Link>
              </button>
              <button
                onClick={clearCart}
                className="btn btn-primary btn-block ml-1"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
     
  )
}

export default checkout
