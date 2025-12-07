import { AdminItem } from "@/utils/interfaces/admin/adminItem"
import { Square } from "square"



export default async function attachSquareImages(squareImages: Square.CatalogObjectImage[], products: AdminItem[]){

    products.forEach((product) => {
        const imageIds = product.images
        const squareImagesList: string[] = []
        squareImages?.forEach((sqImage) => {
            if(imageIds?.includes(sqImage?.id as string)){
                squareImagesList.push(sqImage?.imageData?.url as string)
            }
        })
        product.squareImageUrls = squareImagesList
    })
    
}


