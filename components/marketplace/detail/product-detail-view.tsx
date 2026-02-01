'use client'

import React, { useEffect } from 'react';
import Head from 'next/head';
import { OrderItem } from '@/utils/interfaces/checkout/orderItem';
import { Plant } from '@/utils/interfaces/product/plant';
import { Merch } from '@/utils/interfaces/product/merch';
import { Seed } from '@/utils/interfaces/product/seed';
import { PriceVariation } from '@/utils/interfaces/product/priceVariation';
import { useCart } from '@/contexts/cart-context';
import { useState } from 'react';
import ProductDetailInfo from './product-detail-info';
import ProductDetailImages from './product-detail-images';
import ProductDetailPrices from './product-detail-prices';
import Navbar from '@/components/layout/navbar';
import AddToCartToastButton from './add-to-cart-toast-button';

interface ProductCardPropTypes {
    item: Plant | Merch | Seed;
    type: string;
    pageColor: string;
}

export interface Variation {
    name: string;
    id: string;
}

const ProductDetailView: React.FC<ProductCardPropTypes> = ({ item, type, pageColor }) => {
    const { addToCart } = useCart();

    const [priceVariation, setPriceVariation] = useState<Variation>();

    useEffect(() => {
        if (item?.price) {
            if (item?.price.length === 1 && item?.price[0].amount !== "0") {
                const option = item?.price[0];
                setPriceVariation({ id: option.id, name: option.type });
            }
        }
    }, []);

    const selectPrice = (event: React.MouseEvent<HTMLButtonElement>, option: PriceVariation) => {
        if (option.amount !== "0") {
            setPriceVariation({ id: option.id, name: option.type } as Variation);
        }
    };

    return (
        <>
            <Head>
                <title>{item.name} | California Nursery</title>
                <meta name="description" content={item.description} />
                <meta property="og:title" content={item.name} />
                <meta property="og:description" content={item.description} />
                <meta property="og:image" content={getImageUrl()} />
                <meta property="og:url" content={`https://yourwebsite.com/products/${item.id}`} />
            </Head>
            <Navbar />
            <div 
                className="bg-cream mt-[90px] px-[25px]"
            >
                <div 
                    className="mt-[20px] p-[10px] gap-[30px] md:p-[50px] h-full w-full space-y-[5px] md:space-y-[20px] flex flex-col md:flex-row"
                >
                    <ProductDetailImages item={item} />
                    <div 
                        className="flex flex-col w-full h-[975px] md:h-[719px] items-start space-y-10"
                    >
                        <ProductDetailInfo item={item} type={type} pageColor={pageColor} />
                        {item.price && (
                            <ProductDetailPrices 
                                type={type} 
                                pageColor={pageColor}
                                prices={item.price} 
                                selectPrice={selectPrice} 
                                priceVariation={priceVariation}
                            />
                        )}
                        <AddToCartToastButton 
                            handleAddToCartClick={handleAddToCartClick}
                            setDisabled={setDisabled}
                            pageColor={pageColor}
                        />
                    </div>
                </div>
            </div>
        </>
    );


    function setDisabled() {
        if (item?.price) {
            return !priceVariation;
        }
        return true;
    }

    function getImageUrl() {
        if (item.imageUrls && item.imageUrls[0]) {
            return item.imageUrls[0];
        }
        return undefined;
    }

    function handleAddToCartClick(event: React.MouseEvent<HTMLButtonElement>) {
        const price = item?.price?.filter((i) => i.id === priceVariation?.id);
        let val;
        if (price) {
            val = price[0];
        }
        const orderItem = {
            name: `${item.name} ${priceVariation?.name}`,
            quantity: '1',
            catalogObjectId: priceVariation?.id,
            appliedDiscounts: undefined,
            misc: {
                image: item.imageUrls && item.imageUrls[0],
                price: val?.price
            }
        } as OrderItem;

        addToCart(event, item, orderItem);
    }
};

export default ProductDetailView;
