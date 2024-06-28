import { loadStripe } from "@stripe/stripe-js";

export async function doCheckout(amount){
    const checkOut = async({lineItems}) => {
        let stripePromise = null
        let getStripe = () =>{
            if(!stripePromise){
                stripePromise = loadStripe(process.env.NEXT_PUBLIC_KEY)
            }
            return stripePromise
        }
    
    
    
        const stripe = await getStripe()
        await stripe.redirectToCheckout({
            mode: 'payment',
            lineItems,
            successUrl : `${process.env.NEXT_PUBLIC_HOST}/order`,
            cancelUrl : `${process.env.NEXT_PUBLIC_HOST}`
        })
    }
}
