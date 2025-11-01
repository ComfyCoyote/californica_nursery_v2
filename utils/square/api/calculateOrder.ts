import client from "./client";
import { Square } from "square";


export default async function calculateOrder(order: Square.Order){

    const orderCalculateRequest: Square.CalculateOrderRequest = {
        order: order
    }

    try {
        const orderCalculateResponse: Square.CalculateOrderResponse = await client.orders.calculate(orderCalculateRequest)

        const amount = `${Number(orderCalculateResponse.order?.totalMoney?.amount)/100}`

        return amount

    } catch(err) {
        console.log(err)
    }
}
