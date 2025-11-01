'use client'

import Image from 'next/image';
import React from "react";
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { IoMenu } from "react-icons/io5";
import NavbarDropdown from '../navbar-dropdown';
import ShoppingCart from '../../shared/shopping-cart-sidebar';
import { useCart } from '@/contexts/cart-context';
import { usePathname } from 'next/navigation';
import SearchSidebar from '../../marketplace/search-sidebar/search-sidebar';
import { useSearch } from '../../marketplace/search-sidebar/search-sidebar-context';
import NavDropdownMobile from './navbar-dropdown-mobile';


const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const { toggleCart } = useCart();
  const pathname = usePathname();

  const {open, toggleOpen} = useSearch()

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-darkGreen px-1 py-2 flex items-center justify-between flex-col">
      <div className="p-5 text-center">
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
      <div className="flex flex-row w-full items-center px-4 gap-8">
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
        <NavDropdownMobile isOpen={dropdownOpen} setIsOpen={() => setDropdownOpen(!dropdownOpen)}/>
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
