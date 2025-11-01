import client from "./client";
import { Square } from "square";
import { productConstructor } from "../constructors/productConstructor";
import { type } from "os";




export async function getInventory(catalogObjectIds: string[]){
    
    try {

        const searchRequest : Square.BatchGetInventoryCountsRequest = {
            catalogObjectIds: catalogObjectIds,
            states: ['IN_STOCK'],
            updatedAfter: '2025-01-01T00:00:00Z',
            locationIds: ['L3C4J69QTRCAA']
        } 

        const catalogItemSearchResponse = await client.inventory.batchGetCounts(searchRequest)

        if(catalogItemSearchResponse){
            console.log(catalogItemSearchResponse)
            return catalogItemSearchResponse.data
            //return catalogItemSearchResponse.items.map((item) => productConstructor(type, item as Square.CatalogObjectItem))
        }


    } catch(err) {
        console.log(err)
    }
    
}
