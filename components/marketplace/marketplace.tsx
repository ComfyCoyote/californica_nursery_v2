'use client'


import React, {useEffect, useState} from 'react';
import Navbar from '../layout/navbar';
import palette from '@/utils/palette/palette';
import { SearchProvider } from './search-sidebar/search-sidebar-context';
import ProductCard from './card/product-card';
import { useSearch } from './search-sidebar/search-sidebar-context';
import { Plant } from '@/utils/interfaces/product/plant';
import { Seed } from '@/utils/interfaces/product/seed';
import { Merch } from '@/utils/interfaces/product/merch';
import { filterByAttributes } from '@/utils/marketplace-filtering/filterByAttributes';
import { filterByText } from '@/utils/marketplace-filtering/filterByText';

interface MarketplacePropTypes {
    title: string;
    pageColor: string;
    items: Plant[] | Seed[] | Merch[] | undefined;
}

const Marketplace: React.FC<MarketplacePropTypes> = ({ title, pageColor, items }) => {
    const [filteredItems, setFilteredItems] = useState(items)
    const { appWideSearch } = useSearch()

    useEffect(() => {
        if(appWideSearch.searchby === 'attributes'){
            if(!Object.keys(appWideSearch.attributes).length){
                setFilteredItems(items)
            } else {
                setFilteredItems(items?.filter((item) => {
                    return filterByAttributes(item, Object.entries(appWideSearch.attributes))
                }))
            }
        } else if(appWideSearch.searchby === 'name'){
            setFilteredItems(items?.filter((item) => {
                return filterByText(item, appWideSearch.text)
            }))
        }
        
    }, [appWideSearch])

    

    return (
        <React.Fragment>
            <Navbar />
            <div className="bg-cream h-full w-full pt-[160px] md:pt-[105px]">
                <div
                    style={{ backgroundColor: palette[pageColor] }} 
                    className={`overflow-hidden w-full h-[55px]`}>
                    <div className={`text-black whitespace-nowrap inline-flex justify-between items-center w-[2000px] h-full`}>
                        {Array(6).fill(0).map((_, i) => (
                            <span 
                                key={i}
                                className="pt-2 w-full text-3xl font-bold animate-scrollText"
                            >
                                {title.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>
                <p className="text-2xl font-semibold p-4 pt-15 text-black text-center">
                    *Purchased plants, seeds, and merchandise are available for contactless pickup in Long Beach, CA. For wholesale inquiries, contact{' '}
                    <a 
                        href="mailto:wholesale@californicanursery.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                    >
                        wholesale@californicanursery.com
                    </a>
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-15 md:gap-4 px-5 py-10">
                    {
                        filteredItems?.map((item: Plant | Seed | Merch) => (
                            <ProductCard key={item.id} item={item} type={title} pageColor={pageColor}/>
                        ))
                    }
                </div>
            </div>
        </React.Fragment>
    );

};

export default Marketplace;
