import { Product } from "./product";
import { PlantAttributes } from "./plantAttributes";

export interface Plant extends Product {
    plantAttributes?: PlantAttributes;
    scientificName?: string;
    commonName?: string;
}