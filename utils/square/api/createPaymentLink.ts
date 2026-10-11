import client from "./client"
import { Square } from "square";
import { uuid } from 'uuidv4'

export default async function createPaymentLink(order: Square.Order){

    const createPaymentLinkRequest = {
        idempotencyKey: uuid(),
        order: order,
        checkoutOptions: {
          allowTipping: true,
          redirectUrl: `https://www.californicanursery.com/plants`,
          acceptedPaymentMethods: {
            applePay: true,
            googlePay: true,
            cashAppPay: true
          },
          appFeeMoney: {
            amount: 0,
            currency: 'USD'
          }
        }
      }

    try{
        const createPaymentLinkResponse: Square.CreatePaymentLinkResponse = await client.checkout.paymentLinks.create(createPaymentLinkRequest)

        return createPaymentLinkResponse.paymentLink?.longUrl
        
    } catch(err){
        console.log(err)
    }
    

}

