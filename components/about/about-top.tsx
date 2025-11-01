import Image from "next/image";

export const bio = 'Californica Nursery began in 2020 by two longtime friends with an aligned passion for California native plants and a vision for their hometown of Long Beach and beyond. Our approach is simple- replace “traditional” Southern California landscape plants with ecologically valuable, locally-native California species. At Californica Nursery, we want to provide you with the resources to re-shape the status quo of our green spaces.';

const AboutPageTopSection = () => {
    return (
        <div className="bg-cream">
            <div className="bg-lime h-[55px] pt-2 flex items-center justify-center">
                <h2 className="text-3xl font-bold text-black">
                    CALIFORNIA NATIVE PLANTS, GROWN BY CALIFORNIA LOCALS
                </h2>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-8 py-10 md:py-20">
                <div className="flex-1 text-center md:text-left">
                    <p className="h-[400px] text-center md:h-[600px] text-xl md:text-2xl font-semibold text-black">
                        {bio}
                    </p>
                </div>
                <div className="flex-1 relative h-[800px] w-[400px]">
                    <Image
                        priority
                        src='/images/about/jackson_ian_2.webp'
                        alt='ian and jackson'
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                </div>
            </div>
        </div>
    )
}

export default AboutPageTopSection;