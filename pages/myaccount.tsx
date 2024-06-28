import React, { useEffect , useState } from 'react'
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';


const MyAccount = (user) => {
    const router = useRouter()
    const [name, setname] = useState<string | null>('')
  const [Email, setEmail] = useState<string | null>('')
  const [Phone, setPhone] = useState<string | null>('')
  const [Pincode, setPincode] = useState<string | null>('')
  const [Address, setAddress] = useState<string | null>('')
  const [password, setpassword] = useState<string | null>('')
  const [currpassword, setcurrpassword] = useState<string | null>('')
  const [npassword, setnpassword] = useState<string | null>('')
    useEffect(() => {
        if(!localStorage.getItem('token')){
            router.push('/')                 //agr user already logged in h toh use login page nhi dikhayenge
          }
          if(localStorage.getItem('token')){
            setEmail(localStorage.getItem('email'))
          }
          fetchData()
    }, [])

    const fetchData = async()=>{
      let a = await  axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getUser` , {
        token : localStorage.getItem('token') ,
      })
      let resp = a.data
      // console.log(resp)
      setname(resp.name)
      setAddress(resp.address)
      setPincode(resp.pincode)
      setPhone(resp.phone)
    }

    const handleUserSubmit = async () =>{
      let a = await  axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser` , {
        token : localStorage.getItem('token') ,
        address : Address,
        pincode : Pincode,
        phone : Phone,
        name:name
      })
      let resp = a.data
      // console.log(resp)
      setTimeout(() => {
        toast.success("Update Done Successfully !!", {
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

    const handlePasswordSubmit = async () =>{
      if(currpassword == npassword){
        let a = await  axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/updatePassword` , {
          token : localStorage.getItem('token') ,
          password : password,
          newpassword : currpassword
        })
        let resp = a.data
        // console.log(resp)
        if(a.data.success){
          setTimeout(() => {
            toast.success(a.data.msg, {
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
            toast.error(a.data.msg, {
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
      else{
        setTimeout(() => {
          toast.info("Confirm New Password Again !!", {
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
      setpassword('')
      setcurrpassword('')
      setnpassword('')
    }



    const handleChange = async (e)=>{

    

      if(e.target.name == 'name'){
        setname(e.target.value)
      }
      else if(e.target.name == 'address'){
        setAddress(e.target.value)
      }
      else if(e.target.name == 'phone'){
        setPhone(e.target.value)
      }
      else if(e.target.name == 'pincode'){
        setPincode(e.target.value)
      }
      else if(e.target.name == 'password'){
        setpassword(e.target.value)
      }
      else if(e.target.name == 'currpassword'){
        setcurrpassword(e.target.value)
      }
      else if(e.target.name == 'npassword'){
        setnpassword(e.target.value)
      }
  
      }

  return (
    <div className='container mx-auto'>
      <Head>
      <title>{`${name} - MBwear.com`}</title>
    </Head>
      <ToastContainer limit={2} position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <h1 className='text-xl font-bold text-center pb-5 pt-24'>Update Your Account</h1>
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
                  onChange={handleChange}
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
                  Email ( Can Not Be Updated )
                </label>
                {user.value? <input
                  onChange={handleChange}
                  value={user.email}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                /> : <input
                onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  value={Pincode}
                  type="number"
                  id="pincode"
                  name="pincode"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button onClick={handleUserSubmit} className="btn flex mx-auto btn-accent">Submit</button>
            </div>
          </div>
        </div>
        <div className="divider px-20"></div>
        <h1 className='text-xl font-bold text-center pb-5'>Update Your Password</h1>
      <div className="lg:w-1/2 md:w-2/3 mx-5 sm:mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-400"
                >
                  Current Password
                </label>
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="currpassword"
                  className="leading-7 text-sm text-gray-400"
                >
                  New Password
                </label>
               <input
                onChange={handleChange}
                value={currpassword}
                type="password"
                id="currpassword"
                name="currpassword"
                className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
                
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="currpassword"
                  className="leading-7 text-sm text-gray-400"
                >
                  Confirm New Password
                </label>
               <input
                onChange={handleChange}
                value={npassword}
                type="password"
                id="npassword"
                name="npassword"
                className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-accent focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
                
              </div>
            </div>
            <div className="p-2 w-full">
              <button onClick={handlePasswordSubmit} className="btn flex mx-auto btn-accent">Submit</button>
            </div>
          </div>
        </div>
    </div>
  )
}


export default MyAccount
