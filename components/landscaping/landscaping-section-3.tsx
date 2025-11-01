import Image from "next/image";

const images1 = [
    'IMG_0092.webp',
    'IMG_0960.webp',
    'IMG_1012.webp',
    'IMG_1180.webp',
    'IMG_1305.webp',
    'IMG_2254.webp',
    'IMG_2569.webp'
]

const images2 = [2,3,4,5,6,7,8].map(
    (i) => `killyourlawn${i+1}.webp`
)

const images = [...images1, ...images2]

const LandscapingSectionThree = () => {
    return (
        <div className="w-full">
            <div className="bg-lime h-[55px] flex items-center justify-center">
                <h2 className="text-3xl text-black font-bold animate-scrollText-slow whitespace-nowrap">
                    EMAIL US AT CALIFORNICANURSERY@GMAIL.COM
                </h2>
            </div>
            <div className="w-full p-5 bg-darkBrown">
                <p className="text-3xl text-cream font-bold text-center">
                    SCROLL RIGHT TO VIEW GALLERY
                </p>
            </div>
            <div className="w-full h-[650px] overflow-x-scroll border border-darkBrown bg-darkBrown rounded-b-none shadow-md">
                <div className="flex gap-0">
                    {images.map((src, index) => (
                        <div 
                            key={src}
                            className="relative w-[370px] md:w-[400px] h-[570px] md:h-[600px] flex-shrink-0"
                        >
                            <Image 
                                src={`/images/landscaping/${src}`}
                                alt={`Landscaping image ${index + 1}`}
                                fill
                                style={{ objectFit: "cover" }}
                                sizes="(max-width: 1200px) 33.33vw, (min-width: 1201px) 400px"
                                priority={index < 3}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LandscapingSectionThree;
