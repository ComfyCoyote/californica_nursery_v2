import type { AllowedProductTypes } from "@/utils/interfaces/params/allowedProductTypes";
import type { Plant } from "@/utils/interfaces/product/plant";
import type { Seed } from "@/utils/interfaces/product/seed";
import type { Merch } from "@/utils/interfaces/product/merch";
import type { Product } from "@/utils/interfaces/product/product";
import type { PriceVariation } from "@/utils/interfaces/product/priceVariation";
import { Square } from "square";
import { PlantAttributes } from "@/utils/interfaces/product/plantAttributes";
import { plantAttributeConstructor } from "./plantAttributeConstructor";
import { getPriceRangeText } from "@/utils/helpers/priceRangeText";
import { parseScientificName } from "@/utils/helpers/parseScientificName";
import { parseCommonName } from "@/utils/helpers/parseCommonName";

function formatMoneyFromBigInt(amount: bigint): string {
    let amountStr = amount.toString();
    
    while (amountStr.length <= 2) {
      amountStr = "0" + amountStr;
    }
    
    const wholePart = amountStr.slice(0, - 2) || "0";
    const decimalPart = amountStr.slice(-2);
    const formattedWholePart = formatWithCommas(wholePart);
    
    return `${formattedWholePart}.${decimalPart}`;

  }
  
  function formatWithCommas(numStr: string): string {
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

function extractVariationPrice(variations: Square.CatalogObjectItemVariation[] | undefined): PriceVariation[]{
    let imageIds: string[] = []
    let prices: PriceVariation[] = []

    variations?.map((v) => {
        if(v.itemVariationData){
            const price: PriceVariation = {
                id: v.id,
                price: v.itemVariationData.priceMoney?.amount ? formatMoneyFromBigInt(v.itemVariationData.priceMoney.amount) : '0',
                type: v.itemVariationData.name ?? 'n/a',
                amount: 'n/a'
            }
            prices.push(price)
        }

    })

    return prices
}


export function productConstructor(type: AllowedProductTypes, c : Square.CatalogObjectItem): Plant | Seed | Merch {

    const price: PriceVariation[] = c.itemData?.variations ? extractVariationPrice(c.itemData?.variations as Square.CatalogObjectItemVariation[]) : []
    const plantAttributes: PlantAttributes = plantAttributeConstructor(c)

    let specProduct: Plant | Seed | Merch | Product

    const awsCloudFrontHost: string = process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_HOST ?? ''

    const product : Product = {
        id: c.id,
        name: c.itemData?.name ?? '',
        formatName: c.itemData?.name?.replace(/\([^)]*\)/g, '').toUpperCase() ?? '',
        priceText: getPriceRangeText(price),
        description: c.itemData?.description ?? '',
        images: c.itemData?.imageIds ?? [],
        imageUrls: c.itemData?.imageIds?.map((id) => `${awsCloudFrontHost}${c.id}_${id}.webp`) ?? [],
        price: price

    }

    specProduct = product

    if(type === 'PLANT'){
        const plant: Plant = {
            ...product,
            scientificName: parseScientificName(product.name),
            formatName: parseCommonName(product.name),
            plantAttributes
        }
        
        specProduct = plant
    }

    if(type === 'SEED'){
        const seed: Seed = {
            ...product,
            formatName: parseCommonName(product.name),
            plantAttributes
        }
        
        specProduct = seed
    }

    if(type === 'MERCH'){
        const merch: Merch = {
            ...product
        }
        
            specProduct = merch
    }

    return specProduct

}