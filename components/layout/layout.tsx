"use client"

import Footer from "./footer";
import Navbar from "./navbar";
import React from "react";
import ShoppingCart from "../shared/shopping-cart-sidebar";

interface LayoutPropTypes {
    children: any
    
}

const Layout: React.FC<LayoutPropTypes> = ({children}) => {

    return(
        <div className="min-h-screen flex flex-col bg-[#605925]">
            <div className="flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )


}

export default Layout;