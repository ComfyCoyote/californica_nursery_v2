import React from "react";
import LandscapingSectionOne from "./landscaping-section-1";
import LandscapingSectionTwo from "./landscaping-section-2";
import LandscapingSectionThree from "./landscaping-section-3";
import Navbar from "../layout/navbar";

const LandscapingPage = () => {
    return (
        <div className="w-full bg-cream overflow-x-hidden">
            <Navbar/>
            <div className="w-full mt-[100px]">
            <LandscapingSectionOne />
            <LandscapingSectionTwo />
            <LandscapingSectionThree />
            </div>
        </div>
    );
};

export default LandscapingPage;
