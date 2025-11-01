import client from "./client";
import { Square } from "square";
import { indexCategoryId } from "@/utils/helpers/indexCategoryId";
import { AllowedProductTypes } from "@/utils/interfaces/params/allowedProductTypes";
import { plantAttributeConstructor } from "../constructors/plantAttributeConstructor";
import { productConstructor } from "../constructors/productConstructor";




export async function getProducts(type: AllowedProductTypes, cursor?: string, query?: string, textFilter?: string, limit?: number){
    
    const categoryId = indexCategoryId(type)

    try {

        const searchRequest : Square.SearchCatalogItemsRequest = {
            textFilter: textFilter,
            categoryIds: [categoryId],
            limit: limit,
            archivedState: 'ARCHIVED_STATE_NOT_ARCHIVED',
        } 

        const catalogItemSearchResponse: Square.SearchCatalogItemsResponse = await client.catalog.searchItems(searchRequest)

        if(catalogItemSearchResponse.items){
            return catalogItemSearchResponse.items.map((item) => productConstructor(type, item as Square.CatalogObjectItem))
        }


    } catch(err) {
        console.log(err)
    }
    
}
