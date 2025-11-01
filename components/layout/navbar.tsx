'use client'

import Image from 'next/image';
import React from "react";
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import NavbarDropdown from './navbar-dropdown';
import ShoppingCart from '../shared/shopping-cart-sidebar';
import { useCart } from '@/contexts/cart-context';
import { usePathname } from 'next/navigation';
import SearchSidebar from '../marketplace/search-sidebar/search-sidebar';
import { useMediaQuery } from 'react-responsive';
import { useSearch } from '../marketplace/search-sidebar/search-sidebar-context';
import NavbarMobile from './mobile-navbar/navbar-mobile';

const Navbar: React.FC = () => {
  const [shopOpen, setShopOpen] = React.useState(false);
  const [exploreOpen, setExploreOpen] = React.useState(false);

  const isMobile = useMediaQuery({query: "(max-width: 768px)"});

  const { toggleCart } = useCart();
  const pathname = usePathname();

  const {open, toggleOpen} = useSearch()

  const shopOptions = [
    { value: 'option1', label: 'PLANTS', bgColor: 'lime', hoverColor: 'green-hover', href: '/plants'},
    { value: 'option2', label: 'SEEDS', bgColor: 'skyblue', hoverColor: 'blue-hover', href: '/seeds' },
    { value: 'option3', label: 'MERCH', bgColor: 'pink', hoverColor: 'purple-hover', href: '/merch' },
  ];

  const exploreOptions = [
    { value: 'option1', label: 'LANDSCAPING', bgColor: 'orange-natural', hoverColor: 'orange-natural-hover', href: '/landscaping' },
    { value: 'option2', label: 'ABOUT', bgColor: 'yellow-natural', hoverColor: 'yellow-natural-hover', href: '/about' },
  ]

  if(isMobile){
    return (
      <NavbarMobile />
    )
  } 

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-darkGreen px-1 py-2 flex items-center justify-between flex-col md:flex-row">
      <div className="p-5 text-center md:text-left">
        <Link href="/">
          <Image
            height={50}
            width={200} 
            src={'/images/titles/nav_bar.png'}
            alt={'Californica Nursery Logo'}
            className="w-[200px] h-[50px]"
          />
        </Link>
      </div>      
      <div className="flex flex-col md:flex-row w-full md:auto items-center justify-end gap-8">
        <NavbarDropdown options={shopOptions} placeholder="Shop" isOpen={shopOpen} setIsOpen={() => {setExploreOpen(false); setShopOpen(!shopOpen)}}/>
        <NavbarDropdown options={exploreOptions} placeholder="Explore" isOpen={exploreOpen} setIsOpen={() => {setShopOpen(false); setExploreOpen(!exploreOpen)}}/>
        <Link href={'/contact'}>
          <button className="bg-transparent text-white text-2xl hover:bg-transparent">
            <span className="text-cream">CONTACT</span>
          </button>
        </Link>
        <ShoppingCart />
        <SearchSidebar type={pathname}/>
        <div className="text-center">
          <button
            className="h-[50px] md:h-[70px] w-[50px] md:w-[70px] rounded-full bg-darkBrown text-white hover:bg-transparent" 
            onClick={toggleCart}
          >
            <Image
              height={50}
              width={50}
              src="/images/icons/basket_lime.png"
              alt="Shopping Cart"
              className="w-full h-full"
            />
          </button>
        </div>

        {
          ["/plants", "/seeds", "/merch"].includes(pathname) &&
          <div className="text-center mt-2 md:mt-0">
            <button
              onClick={toggleOpen}
              className="h-[50px] md:h-[70px] w-[50px] md:w-[70px] bg-darkGreen text-white hover:bg-transparent"
            >
              <FaSearch className="text-lime text-3xl" />
            </button>
          </div>
        }
        
      </div>
    </div>
  );

 
}

export default Navbar;
