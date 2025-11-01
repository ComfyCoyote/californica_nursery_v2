import { Product } from "./product";
import { PlantAttributes } from "./plantAttributes";

export interface Seed extends Product {
    plantAttributes?: PlantAttributes;
}