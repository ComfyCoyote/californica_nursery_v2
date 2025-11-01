import Image from "next/image";

const text1 = "we're determined to restore the greater Long Beach area into a beautiful and ecologically valuable refuge for our local wildlife, one garden at a time."
const text2 = 'Nature is the best designer and our work reflects its beauty.'

const LandscapingSectionOne = () => {
    return (
        <div className="w-full">
            <div className="bg-lime h-[55px] flex items-center justify-center">
                <h2 className="text-3xl font-bold text-black">LETS KILL YOUR LAWN!!</h2>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-0">
                <div className="relative h-[70vh] flex-1">
                    <Image 
                        src={'/images/landscaping/brett_ian_landscaping_cropped.webp'} 
                        alt={'Ian and Jackson killing the lawn'} 
                        fill 
                        style={{ objectFit: "cover" }}
                        quality={60} 
                        sizes="(max-width: 1200px) 33.33vw, (min-width: 1201px) 400px"
                        priority
                    />
                </div>
                <div className="relative h-[70vh] flex-1">
                    <Image 
                        src={'/images/landscaping/killyourlawn1.webp'} 
                        alt={'Ian and Jackson killing the lawn'} 
                        fill 
                        style={{ objectFit: "cover" }}
                        quality={60} 
                        sizes="(max-width: 1200px) 33.33vw, (min-width: 1201px) 400px"
                        priority
                    />
                </div>
                <div className="relative h-[70vh] flex-1">
                    <Image 
                        src={'/images/landscaping/killyourlawn2.webp'} 
                        alt={'Ian and Jackson killing the lawn'} 
                        fill 
                        style={{ objectFit: "cover" }}
                        quality={60} 
                        priority
                    />
                </div>
            </div>
            <div className="bg-olive">
                <div className="p-5 md:p-10 lg:p-10 w-full flex items-center justify-center">
                    <p className="text-center text-2xl text-cream">
                        At Californica Nursery, {text1 + ' ' + text2}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LandscapingSectionOne;
