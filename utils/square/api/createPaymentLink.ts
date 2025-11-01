import client from "./client"
import { Square } from "square";


export default async function createPaymentLink(order: Square.Order){

    const createPaymentLinkRequest = {
        order: order
    }

    try{
        const createPaymentLinkResponse: Square.CreatePaymentLinkResponse = await client.checkout.paymentLinks.create(createPaymentLinkRequest)

        return createPaymentLinkResponse.paymentLink?.longUrl
        
    } catch(err){
        console.log(err)
    }
    

}

