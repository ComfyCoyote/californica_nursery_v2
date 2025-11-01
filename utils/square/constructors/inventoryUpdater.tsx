import { Plant } from "@/utils/interfaces/product/plant"
import { Seed } from "@/utils/interfaces/product/seed"
import { Merch } from "@/utils/interfaces/product/merch"
import { Square } from "square"
import { PriceVariation } from "@/utils/interfaces/product/priceVariation"
import { getPriceRangeText } from "@/utils/helpers/priceRangeText"


export function inventoryUpdater(inventoryAmounts: Square.InventoryCount[], items: Plant[] | Seed[] | Merch[]){
    items.map((item: Plant | Seed | Merch) => {
        const itemPrices = item.price
        const inventoryAdjustedPrices: PriceVariation[] = []
        inventoryAmounts.forEach((amount: Square.InventoryCount) => {
            itemPrices.forEach((price: PriceVariation) => {
                if(amount.catalogObjectId === price.id){
                    const inventoryAdjustedPrice: PriceVariation = {
                        id: price.id,
                        price: price.price,
                        type: price.type,
                        amount: amount.quantity ?? 'n/a'
                    }
                    inventoryAdjustedPrices.push(inventoryAdjustedPrice)
                }
            })
        })

        item.price = inventoryAdjustedPrices
        item.priceText = getPriceRangeText(inventoryAdjustedPrices)
        return item
    })
    return items
}