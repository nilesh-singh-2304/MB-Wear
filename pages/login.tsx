import React, { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import Image from 'next/image'
import logi from "../photos/login.png"
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router, useRouter } from 'next/router';
import Head from 'next/head'

const Login = ({reRenderNav}) => {
  const router = useRouter()
  const [email, setemail] = useState<string | null >('')
  const [password, setpassword] = useState<string | null >('')

  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')                 //agr user already logged in h toh use login page nhi dikhayenge
    }
  }, [])

  const handleChange = (e) =>{
    if(e.target.name == 'email'){
      setemail(e.target.value)
    }
    else if(e.target.name == 'password'){
      setpassword(e.target.value)
    }
  }
  // console.log(email , password)
  interface ApiResponse {
    success: boolean;
    // Add other properties as needed
  }
  

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const data = {email,password}
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
        // console.log("Success:", result);

        //Typescript m hmare paas result m ek object aata h isliye .success ya .error property ko use krn k lie hme response ko parse krna pda and store kia result m
  if(result.success){
    localStorage.setItem("token" , result.token)
    localStorage.setItem("email" , result.email)
    toast.success('User Found !!', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      router.push(process.env.NEXT_PUBLIC_HOST)
    
    }, 1500);
  }
  else{
    toast.error(result.error, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
    
setemail('')
setpassword('')
  }

  return (
    <div>
      <Head>
      <title>{`Login - MBwear.com`}</title>
    </Head>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <div className="font-[sans-serif] pt-10 text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 rounded-md">
        <div className="md:h-full ml-20 max-md:mt-10 rounded-xl lg:p-12 p-8">
            <Image src={logi} alt='' width={330} height={330}/>
          </div>
          <div className="md:max-w-md w-full sm:px-6 py-4">
            <form onSubmit={handleSubmit} method='POST'>
              <div className="mb-12">
                <h3 className="text-3xl text-gray-50 font-extrabold">Sign in</h3>
                <p className="text-sm text-gray-50 mt-4 ">Dont have an account <Link href={'/signup'}><span className="text-warning font-semibold hover:underline ml-1 whitespace-nowrap">Register here</span></Link></p>
              </div>
              <div>
                <label className="text-xs block mb-2 text-gray-50">Email</label>
                <div className="relative flex items-center">
                  <input value={email} onChange={handleChange} name="email" type="email" required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter email" />
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
              <div className="mt-8">
                <label className="text-xs block text-gray-50 mb-2">Password</label>
                <div className="relative flex items-center">
                  <input value={password} onChange={handleChange} name="password" type="password" required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter password" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 mt-5">
                <div className="flex items-center">
                  <input onChange={handleChange} id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-3 block text-gray-50 text-sm">
                    Remember me
                  </label>
                </div>
                {/* <div>
                <Link href={'/forgetPass'}><span className="text-warning font-semibold text-sm hover:underline">
                    Forgot Password?
                  </span></Link> 
                </div> */}
              </div>
              <div className="mt-12">
                <button type="submit" className="w-full py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-warning hover:bg-warning focus:outline-none">
                  Sign in
                </button>
              </div>
              <p className="my-8 text-sm text-gray-400 text-center">or continue with</p>
              <div className="space-x-8 flex justify-center">
                <button type="button"
                  className="border-none outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" className="inline" viewBox="0 0 512 512">
                    <path fill="#fbbd00"
                      d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                      data-original="#fbbd00" />
                    <path fill="#0f9d58"
                      d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                      data-original="#0f9d58" />
                    <path fill="#31aa52"
                      d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                      data-original="#31aa52" />
                    <path fill="#3c79e6"
                      d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                      data-original="#3c79e6" />
                    <path fill="#cf2d48"
                      d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                      data-original="#cf2d48" />
                    <path fill="#eb4132"
                      d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                      data-original="#eb4132" />
                  </svg>
                </button>
                <button type="button"
                  className="border-none outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#000" viewBox="0 0 22.773 22.773">
                    <path d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z" data-original="#000000"></path>
                  </svg>
                </button>
                <button type="button"
                  className="border-none outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#007bff" viewBox="0 0 167.657 167.657">
                    <path d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z" data-original="#010002"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
