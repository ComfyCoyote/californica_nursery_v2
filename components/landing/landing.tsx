'use client'


import React from 'react';
import Image from 'next/image';
import LinkIcon from './link-icon';
import ShoppingCart from '../shared/shopping-cart-sidebar';
import { useCart } from '@/contexts/cart-context';
import palette from '@/utils/palette/palette';

const pages = [
    {
        "name": "plants",
        "color": palette.lime
    },
    {
        "name": "seeds",
        "color": palette.skyblue
    },
    {
        "name": "merch",
        "color": palette.purple
    },
    {
        "name": "landscaping",
        "color": palette.orange
    },
    {
        "name": "about",
        "color": palette.lightYellow
    },
    {
        "name": "contact",
        "color": palette.pink
    }
];

const LandingPage: React.FC = () => {
    const { toggleCart } = useCart();

    return (
        <React.Fragment>
            <div className="min-h-screen bg-olive">
                <div className="h-[200px] bg-darkGreen flex items-center justify-center px-5">
                    <div className="p-5 w-[600px] h-[100px]">
                        <Image 
                            src="/images/titles/wordmark_web.png" 
                            alt="Logo" 
                            width={600} 
                            height={100}
                        />
                    </div>
                    <div className="hidden md:block absolute right-10">
                        <Image
                            src="/images/icons/basket_lime.png" 
                            alt="Shopping Cart" 
                            width={100} 
                            height={100}
                            className="w-[100px] h-[100px] cursor-pointer"
                            onClick={toggleCart}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center min-h-screen p-20">
                    <div className="flex flex-col md:flex-row justify-center w-full max-w-full gap-4">
                        {pages.slice(0, 3).map((l) => (
                            <LinkIcon key={l.name} iconName={l.name} color={l.color} />
                        ))}
                    </div>
                    <div className="flex flex-col md:flex-row justify-center w-full gap-4">
                        {pages.slice(3, 6).map((l) => (
                            <LinkIcon key={l.name} iconName={l.name} color={l.color} />
                        ))}
                    </div>
                </div>
            </div>
            <ShoppingCart />
        </React.Fragment>
    );
};

export default LandingPage;
