import client from "./client";
import { Square } from "square";







export default async function getSquareImages(){


    try {

        const searchRequest : Square.SearchCatalogObjectsRequest = {
            objectTypes: ['IMAGE'],
        } 

        const catalogSearchResponse: Square.SearchCatalogObjectsResponse = await client.catalog.search(searchRequest)

        if(catalogSearchResponse.objects){
            return catalogSearchResponse.objects as Square.CatalogObjectImage[]
        }


    } catch(err) {
        console.log(err)
    }
    
}


