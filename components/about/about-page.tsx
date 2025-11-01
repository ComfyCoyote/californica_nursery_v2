
import AboutPageTopSection from "./about-top";
import AboutPageIanSection from "./about-ian";
import AboutPageJacksonSection from "./about-jackson";
import Navbar from "../layout/navbar";

const BannerChild = () => {
    return (
        <div className="flex gap-64">
            <p className="text-2xl font-bold">
                HEAL THE URBAN LANDSCAPE
            </p>
            <p className="text-2xl font-bold">
                PLANT A NATIVE PLANT
            </p>
            <p className="text-2xl font-bold">
                SUPPORT LOCAL WILDLIFE
            </p>
        </div>
    )
}

const AboutPage = () => {
    return (
        <div className="overflow-hidden h-full w-full flex flex-col justify-between pt-36 md:pt-24">
            <Navbar/>
            <AboutPageTopSection />
            <div className={`bg-lime text-black whitespace-pre-wrap inline-flex flex-start items-center w-[4000px] h-full`}>
                        {[`HEAL THE URBAN LANDSCAPE`, `PLANT A NATIVE PLANT`, `SUPPORT LOCAL WILDLIFE`].map((txt, i) => (
                            <span 
                                key={i}
                                className="py-2 w-full text-3xl font-bold animate-scrollText-slow"
                            >
                                {txt}
                            </span>
                        ))}
            </div>
            <AboutPageIanSection />
            <AboutPageJacksonSection />
            <div className={`bg-lime text-black whitespace-nowrap inline-flex flex-start items-center w-[3000px] h-full`}>
                        {Array(3).fill(0).map((_, i) => (
                            <span 
                                key={i}
                                className="py-2 w-full text-3xl font-bold animate-scrollText-slow"
                            >
                                {"EMAIL US - INFO@CALIFORNICANURSERY.COM"}
                            </span>
                        ))}
                        
            </div>
        </div>
    )
}

export default AboutPage;