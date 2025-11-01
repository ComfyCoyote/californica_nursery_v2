import Marketplace from "@/components/marketplace/marketplace"
import { getProducts } from "@/utils/square/api/getProducts"
import { getInventory } from "@/utils/square/api/getInventory"
import { inventoryUpdater } from "@/utils/square/constructors/inventoryUpdater"
import { Plant } from "@/utils/interfaces/product/plant"
import { Square } from "square"

export default async function Page(){
    const plants = await getProducts('PLANT')
    const inventoryPrices = plants?.map((item) => item.price)
    const inventoryIds = plants?.map((item) => item.id)
    const inventory = await getInventory(inventoryIds as string[])
    const updatedInventory = inventoryUpdater(inventory as Square.InventoryCount[], plants as Plant[])
    
    console.log(plants?.[0])

    return (
        <Marketplace title="plants" pageColor="lime" items={plants} />
    )
}