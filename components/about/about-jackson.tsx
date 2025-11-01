import Image from "next/image";

export const jacksonsBio = 'Passionate educators and enthusiastic friends are who I credit for leading me to where I am today. Discovering what I love to do while having it be something my community calls for is a blessing and a role I’m honored to fulfill. See you out there!'

const AboutPageJacksonSection = () => {
    return (
        <div className="bg-olive w-full flex flex-col md:flex-row items-center">
            <div className="p-5 md:p-10 w-full md:w-1/2 flex flex-col justify-between items-center md:items-start gap-4 text-center md:text-left">
                <p className="text-2xl md:text-3xl font-semibold">
                    JACKSON DRISCOLL
                </p>
                <p className="text-base md:text-lg font-semibold">
                    {jacksonsBio}
                </p>
                <div className="flex">
                    <Image
                        priority
                        src='/images/about/signature jackson green.png'
                        alt="jackson signature"
                        width={300}
                        height={200}
                    />
                </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
                <Image
                    priority
                    src="/images/about/jackson1.webp"
                    alt="hiking photo"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                />
            </div>
        </div>
    )
}

export default AboutPageJacksonSection;