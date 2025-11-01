import { PriceVariation } from "@/utils/interfaces/product/priceVariation";

const fmt = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});


export function getPriceRangeText(prices: PriceVariation[]){
    if(prices?.length > 0){

      const allOutOfStock = prices.map((price) => price.amount === '0' && true)

      if(allOutOfStock.every(Boolean)){

        return 'Out of stock'

      } else {

        prices.sort((a, b) => {
          return Number(a.price) - Number(b.price)
        })

        const startPrice = prices[0]?.price
        const endPrice = prices[prices.length - 1]?.price

        if(startPrice === endPrice){
          const amount = Number(startPrice)
          if(amount > 0){
            return `$${fmt.format(Number(startPrice))}`
          }
          
        } else {
          const amount =  Number(endPrice)/100 - Number(startPrice)/100
          if(amount > 0){
            return `$${fmt.format(Number(startPrice))} - $${fmt.format(Number(endPrice))}`
        } 

      }

    }

    } 

  }


