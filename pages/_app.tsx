import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }: AppProps) {
  const [cart,setCart] = useState({})       //giving cart as am object
  const [subTotal, setsubTotal] = useState<number>(0) //initial subtotal is 0
  const [user, setuser] = useState({value:null , email:null}) //ye usestate hmne user check krn k lie bnaya
  const [key, setkey] = useState<number | null>()  //kbhi bhi hmne apna navbar agr rerender krna hoga toh hm key ko change kr denge
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  
  
  useEffect(()=>{
    router.events.on('routeChangeStart', ()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
  })
  useEffect(() => {
    try {
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error("error")
      localStorage.clear();
    }
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    if(token){
      setuser({value:token , email:email })            //agr user exist krta h i.e. jwt token h toh user m token ko set krdo
    }
    setkey(Math.random())
   
  }, [router.query])          ///useeffect ko run krn k lie hmne router.query use kia taaki use he hmara router route change kre wse he useeffect run ho jye

  const saveCart = (myCart) =>{
    localStorage.setItem("cart" , JSON.stringify(myCart))
    let subT = 0;
    let Keys = Object.keys(myCart)
    for (let i = 0; i < Keys.length; i++) {
      subT += myCart[Keys[i]].price*myCart[Keys[i]].qty
      setsubTotal(subT)
    }
  }
  
  const addToCart = (itemCode , qty , price , name , size , varient) =>{
      let newCart = cart;
      if(itemCode in cart){
        newCart[itemCode].qty = cart[itemCode].qty + qty
      }
      else{
        newCart[itemCode] = { qty:1 , price , name , size , varient}; 
      }
      setCart(newCart)
      saveCart(newCart) //taaki re;oad krn p cart ud n jye 

  }

  const clearCart = () =>{
    setCart({})    //state variable ko set krk update krn p uski immediately update hone ki gurantee nhi hoti h , its only a req and JS update it according to itself
    saveCart({})  //so agr set cart hone s phle he savecart ho gya to purani cart  he save ho jyegi and not the empty cart
    setsubTotal(0)
  }

  const removeFromCart = (itemCode , qty , price , name , size , varient) =>{
    let newCart = JSON.parse(JSON.stringify(cart)) ;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if(newCart[itemCode].qty <= 0){
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart) //taaki re;oad krn p cart ud n jye 

}
const buyNow = (itemCode , qty , price , name , size , varient) =>{
       let newCart = {}
       newCart[itemCode] = {itemCode, qty , price , name , size , varient}
      setCart(newCart)
      saveCart(newCart) //taaki re;oad krn p cart ud n jye 
      
      router.push('/checkout')      //is funcn ko [slug.js s htana pda as vha pr ye phle toh cart ko clr krk set krn ki koshish krra h then new cart ko savew krra h toh thode mismatch ki wjh s cart pooori clr nhi ho rhi h]
}

const reRenderNav = () =>{
  setkey(Math.random())
}

const logout = () =>{
  localStorage.removeItem('token')
  setuser({value:null , email:null})
  setkey(Math.random())
  router.push('/') 
}
  return <>
  <div className="overflow-x-hidden">
  <LoadingBar
        color='#00FFFF'
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
  {key && < Navbar logout={logout} user={user} key={key} buyNow={buyNow} cart={cart} addToCart ={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} /> }
   {/* //hmne user and key ko navbar m de dia as hm apn user ko navbar m he handle krna chahate h */}
  <Component  buyNow={buyNow} user={user} reRenderNav={reRenderNav} cart={cart} addToCart ={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
  <Footer />
  {/* <div>
    hello
  </div> */}
  </div>
  </>;
}
