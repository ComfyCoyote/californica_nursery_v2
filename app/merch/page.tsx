import Marketplace from "@/components/marketplace/marketplace"
import getProducts from "@/utils/square/api/getProducts"
import getInventory from "@/utils/square/api/getInventory"
import inventoryUpdater from "@/utils/square/constructors/inventoryUpdater"
import { Plant } from "@/utils/interfaces/product/plant"
import { Square } from "square"

export default async function Page(){
    const merch = await getProducts('MERCH')
    //const inventoryPrices = merch?.map((item) => item.price)
    //const inventoryIds = merch?.map((item) => item.id)
    //const inventory = await getInventory(inventoryIds as string[])
    //const updatedInventory = inventoryUpdater(inventory as Square.InventoryCount[], merch as Plant[])
    
    return (
        <Marketplace title="merch" pageColor="pink" items={merch}/>
    )
}