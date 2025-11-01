import React from 'react';
import { Plant } from '@/utils/interfaces/product/plant';
import { Seed } from '@/utils/interfaces/product/seed';
import { Merch } from '@/utils/interfaces/product/merch';
import Image from 'next/image';
import Link from 'next/link';
import palette from '@/utils/palette/palette';

interface ProductCardPropTypes {
    item: Plant | Seed | Merch;
    type: string;
    pageColor: string;
}

const ProductCard: React.FC<ProductCardPropTypes> = ({ item, type, pageColor }) => {
    
    return (
        <Link 
            prefetch={true}
            href={`/${type}/${item.id}/${item.formatName}`}
            className="block"
        >
        <div className="flex flex-col items-center space-y-0">
            <div className="relative h-[300px] w-[200px] md:h-[500px] md:w-[22vw]">
                {   
                    // the reason we are doing it this way is because we dont want to render the Image AT ALL if there is no image found
                    item.imageUrls?.[0] &&
                    <Image 
                        //placeholder='blur'
                        blurDataURL={item.imageUrls?.[0]}
                        src={item.imageUrls?.[0]} 
                        alt="Product" 
                        fill 
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 30em) 50vw, (max-width: 48em) 25vw, (max-width: 62em) 22vw, 20vw"
                        quality={60}
                        loading='eager'
                    />
                }
            
            </div>
            <div 
                className={`p-2 w-[200px] md:w-[22vw] flex justify-between items-center`}
                style={{ backgroundColor: palette[pageColor] }}
            >
            <span className="font-semibold text-lg text-black">{item.formatName}</span>
            <span className="font-semibold text-lg text-black">{item.priceText}</span>
            </div>
        </div>
        </Link>
  );

};

export default ProductCard;
