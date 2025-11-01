import { Square } from "square";


export interface OrderItem {
    [key: string]: any;

    name: string;
    quantity: string;
    catalogObjectId: string;
    modifiers?: Square.OrderLineItemModifier[];
    appliedDiscounts?: Square.OrderLineItemAppliedDiscount[]
    appliedTaxes: Square.OrderLineItemAppliedTax[]
    misc: any
}