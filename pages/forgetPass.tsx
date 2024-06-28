import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import forgi from "../photos/forget.png"
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const forgetPass = () => {
  const router = useRouter()
  // console.log(router.query.token)
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push(process.env.NEXT_PUBLIC_HOST)                 //agr user already logged in h toh use login page nhi dikhayenge
    }
  }, [])
  const [password, setpassword] = useState<string | null>('')
  const [cpassword, setcpassword] = useState<string | null>('')
  const [email, setemail] = useState<string | null>('')

  const sendResetEmail =async () =>{
    let a = await  axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/forgetPass` , {
      email : email ,
      sendMail : true
    })
    let resp = a.data
    if(resp.success){
      setTimeout(() => {
        toast.success("Email Sent !! Check the Inbox", {
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
        toast.error("Some Error Occured !!", {
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


  const resetPassword = async()=>{
    if(password == cpassword && password){
      let a = await  axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/forgetPass` , {
        email : email ,
        sendMail : true
      })
      let resp = a.data
      if(resp.success){
        await setTimeout(() => {
          toast.success("Password is Changed ! You can Login now ", {
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
        router.push('/login')
      }
      else{
        setTimeout(() => {
          toast.error("Some Error Occured !!", {
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
        toast.error("Confirm new password again !! ", {
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

  const handleChange = (e) =>{
    if(e.target.name == 'email'){
      setemail(e.target.value)
    }
    else if(e.target.name == 'password'){
      setpassword(e.target.value)
    }
    else if(e.target.name == 'cpassword'){
      setcpassword(e.target.value)
    }
  }
  return (
    <div>
      <Head>
      <title>{`Forget Password - MBwear.com`}</title>
    </Head>
    <ToastContainer limit={2} position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <div className="font-[sans-serif] pt-10 text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 rounded-md">
        <div className="md:h-full ml-20 max-md:mt-10 rounded-xl lg:p-12 p-8">
            <Image className='scale-150 pt-20' src={forgi} alt='' width={800} height={800}/>
          </div>
          <div className="md:max-w-md w-full sm:px-6 py-4">
            {router.query.token && <div>
              <form>
              <div className="mb-12">
                <h3 className="text-3xl text-gray-50 font-extrabold">Forget Passowrd ?</h3>
              </div>
              <div>
                <label className="text-xs block mb-2 text-gray-50">New Passwprd</label>
                <div className="relative flex items-center">
                  <input value={password} onChange={handleChange} name="password" type="password" required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="New Password" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                      <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-xs block mb-2 mt-5 text-gray-50">Confirm New Passwprd</label>
                <div className="relative flex items-center">
                  <input value={cpassword} onChange={handleChange} name="cpassword" type="password" required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Confirm New Password" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                      <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="mt-12">
                <button onClick={resetPassword} type="button" className="w-full py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-warning hover:bg-warning focus:outline-none">
                  Continue
                </button>
              </div>
            </form>
            </div> }
            {!router.query.token && <form>
              <div className="mb-12">
                <h3 className="text-3xl text-gray-50 font-extrabold">Forget Passowrd ?</h3>
                <p className="text-sm text-gray-50 mt-4 ">If You Remember password <Link href={'/login'}><span className="text-warning font-semibold hover:underline ml-1 whitespace-nowrap">Login here</span></Link></p>
              </div>
              <div>
                <label className="text-xs block mb-2 text-gray-50">Email</label>
                <div className="relative flex items-center">
                  <input value={email} onChange={handleChange} name="email" type="text" required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter email" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                      <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="mt-12">
                <button onClick={sendResetEmail} type="button" className="w-full py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-warning hover:bg-warning focus:outline-none">
                  Continue
                </button>
              </div>
            </form> }
            
          </div>
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default forgetPass
