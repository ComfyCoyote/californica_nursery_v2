import Image from "next/image";

const iansBio = 'Ever since I was a kid, I’ve loved being in nature. Thanks to amazing resources in my life, my relationship with it has grown tremendously over the years and I couldn’t be more grateful. '


const AboutPageIanSection = () => {
    return (
        <div className="bg-darkBrown w-full flex flex-col md:flex-row items-center border-b border-white/10">
            <div className="flex justify-center w-full md:w-auto">
                <Image
                    priority
                    src='/images/about/Ian-2.webp'
                    alt='hiking photo'
                    width={900}
                    height={900}
                    className="w-full h-auto"
                />
            </div>
            <div className="p-5 md:p-10 w-full md:w-auto flex flex-col items-center md:items-start text-center md:text-left border-t border-white/10 md:border-t-0">
                <p className="text-2xl md:text-3xl font-bold text-white">
                    IAN RHODES
                </p>
                <p className="text-base md:text-lg font-semibold">
                    {iansBio}
                </p>
                <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
                    <Image
                        priority
                        src='/images/about/signature ian green.png'
                        alt="ian signature"
                        width={300}
                        height={200}
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    )
}

export default AboutPageIanSection;