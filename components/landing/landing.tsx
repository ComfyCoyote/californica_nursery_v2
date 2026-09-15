'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LinkIcon from './link-icon';
import ShoppingCart from '../shared/shopping-cart-sidebar';
import { useCart } from '@/contexts/cart-context';
import palette from '@/utils/palette/palette';

const carouselImages = [
    '/images/home_page_carousel/A6400018.webp',
    '/images/home_page_carousel/A6400049.webp',
    '/images/home_page_carousel/A6409843.webp',
    '/images/home_page_carousel/A6409984.webp',
    '/images/home_page_carousel/IMG_0035.webp',
    '/images/home_page_carousel/IMG_0859.webp',
    '/images/home_page_carousel/IMG_1544.webp',
    '/images/home_page_carousel/IMG_1578.webp',
    '/images/home_page_carousel/IMG_1750.webp',
    '/images/home_page_carousel/IMG_2281.webp',
    '/images/home_page_carousel/IMG_2327.webp',
    '/images/home_page_carousel/IMG_2390.webp',
    '/images/home_page_carousel/IMG_2862.webp',
    '/images/home_page_carousel/IMG_2879.webp',
    '/images/home_page_carousel/IMG_3541.webp',
];

const pages = [
    { "name": "plants",      "color": palette.lime },
    { "name": "seeds",       "color": palette.skyblue },
    { "name": "merch",       "color": palette.purple },
    { "name": "landscaping", "color": palette.orange },
    { "name": "about",       "color": palette.lightYellow },
    { "name": "contact",     "color": palette.pink },
];

const LandingPage: React.FC = () => {
    const { toggleCart } = useCart();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(i => (i + 1) % carouselImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            <div className="relative min-h-screen bg-olive overflow-hidden">
                {carouselImages.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={src}
                            alt="Background"
                            fill
                            className="object-cover object-center"
                            priority={index === 0}
                        />
                    </div>
                ))}
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 h-[200px] bg-darkGreen/80 flex items-center justify-center px-5">
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
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-20">
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
