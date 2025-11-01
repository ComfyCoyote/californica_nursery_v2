import { CategoryID } from "../square/global/category_ids";
import type { AllowedProductTypes } from "../interfaces/params/allowedProductTypes";

export function indexCategoryId(type: AllowedProductTypes): string {
    let categoryId;

    switch(type){
        case 'PLANT':
            categoryId = CategoryID.PLANT
            break;
        case 'SEED':
            categoryId = CategoryID.SEED
            break;
        case 'MERCH':
            categoryId = CategoryID.MERCH
            break;
    }

    return categoryId
}