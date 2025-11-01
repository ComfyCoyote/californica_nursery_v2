import React from 'react';
import { PriceVariation } from '@/utils/interfaces/product/priceVariation';
import { Variation } from './product-detail-view';
import palette from '@/utils/palette/palette';

interface ProductDetailInfoPropTypes {
    priceVariation: Variation | undefined;
    prices: PriceVariation[];
    selectPrice: (e: any, option: PriceVariation) => void;
    type: string;
    pageColor: string;
}

const ProductDetailPrices: React.FC<ProductDetailInfoPropTypes> = ({ prices, priceVariation, selectPrice, type, pageColor }) => {
    
    return (
        <div className="flex items-start gap-2">
            {prices.map((option) => (
                <button
                    key={option.price}
                    disabled={option.amount === "0"}
                    style={{ backgroundColor: palette[pageColor] }} 
                    onClick={(e) => selectPrice(e, option)}
                    className={`
                        p-7
                        rounded-none
                        border-0
                        ${priceVariation?.id === option.id ? 'border-2 border-black' : ''}
                        w-full max-w-[200px]
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                >
                    <div className="flex flex-col">
                        <span className="text-black">{formatSizeText(option.type)}</span>
                        <span className="text-black">{option.amount === "0" ? 'out of stock' : `$${Number(option.price)}`}</span>
                    </div>
                </button>
            ))}
        </div>
    );

  

    function formatSizeText(text: string): string {
        const cut = text.slice(0, 5);
        return cut.toUpperCase();
    }
};

export default ProductDetailPrices;
