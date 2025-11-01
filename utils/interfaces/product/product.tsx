import { PriceVariation } from "./priceVariation";

export interface Product {
    id: string;
    name: string;
    description: string;
    images?: any[];
    imageUrls?: Array<string | null>
    price: PriceVariation[];
    formatName?: string;
    priceText?: string;


}