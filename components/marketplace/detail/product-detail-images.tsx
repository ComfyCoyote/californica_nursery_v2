'use client'

import React from 'react';
import Image from 'next/image';
import { Plant } from '@/utils/interfaces/product/plant';
import { Seed } from '@/utils/interfaces/product/seed';
import { Merch } from '@/utils/interfaces/product/merch';
import { useState } from 'react';

interface ProductDetailInfoPropTypes {
    item: Plant | Seed | Merch;
}

const ProductDetailImages: React.FC<ProductDetailInfoPropTypes> = ({ item }) => {
    const [mainImage, setMainImage] = useState(0);

    return (
        <div className="flex flex-col md:pt-0 pt-20 items-start h-full w-full md:w-3/5 gap-4">
            <div className="relative h-[50vh] w-[40vh] justify-center md:h-[75vh] md:w-[60vh]">
                <Image 
                    placeholder='blur'
                    blurDataURL={getImageSrc()}
                    src={getImageSrc()}
                    loading='eager' 
                    alt="Product Image"  
                    fill={true}
                    sizes="(max-width: 768px) 40vh, 32vw"
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>
            <div className="w-full flex items-start h-1/5 gap-2">
                {item?.imageUrls?.map((img, index) => {
                    if (img) {
                        return (
                            <div 
                                key={img}
                                className="relative cursor-pointer md:w-[5vw] h-[13vh] w-[37vw]"
                                onClick={() => selectImage(index)}
                            >
                                <Image 
                                    key={img}
                                    src={img} 
                                    placeholder='blur'
                                    blurDataURL={getImageSrc()}
                                    alt="Product Image"
                                    sizes="(max-width: 768px) 5vw, 5vw" 
                                    fill={true}
                                    style={{ objectFit: 'cover' }}
                                    quality={50}
                                />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );

    function selectImage(index: number) {
        setMainImage(index);
    }

    function getImageSrc(): string {
        if (item?.imageUrls) {
            if (mainImage === 0 && item?.imageUrls?.[0]) {
                return item?.imageUrls?.[0];
            } else if (mainImage > 0 && item?.imageUrls?.[mainImage]) {
                return item?.imageUrls?.[mainImage];
            }
        }
        return '';
    }
};

export default ProductDetailImages;
