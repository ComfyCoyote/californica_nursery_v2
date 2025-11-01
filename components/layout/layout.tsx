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
        <React.Fragment>
            <div className="bg-[#605925] w-full">
                {children}
            </div>
            <Footer />
        </React.Fragment>

    )


}

export default Layout;