import Image from "next/image";

const bp1 = 'Create a functioning habitat of hyper-local plants'
const bp2 = 'Utilize rainwater capture and varied topography, free from supplemental irrigation'
const bp3 = 'Work with, not against your site\'s microclimates'

const text1 = 'In four steps, we can transform your green space into a vibrant California native landscape full of pollinators and free from excessive water use.'
const text2 = 'Native landscaping isn\'t a walk in the park, so let us help you build a deeper connection with your land through a sustainable outdoor space.'

const wp1 = '1. Site Assessment and Consultation'
const wp2 = '2. Curated Plant Species List'
const wp3 = '3. Landscape Blueprint'
const wp4 = '4. Installation'

const textArr = [bp1, bp2, bp3]
const wpArr = [wp1, wp2, wp3, wp4]

interface BulletPointProps {
    text: string
}

const BulletPoint: React.FC<BulletPointProps> = ({text}) => {
    return (
        <div className="flex items-center gap-5">
            <Image src={'/images/icons/pink_star.png'} alt="star" height={50} width={50} />
            <p className="text-cream text-2xl">{text}</p>
        </div>
    )
}

const LandscapingSectionTwo = () => {
    return (
        <div className="w-full">
            <div className="bg-lime h-[55px] flex items-center justify-center">
                <h2 className="text-3xl font-bold text-black">OUR APPROACH</h2>
            </div>
            <div className="w-full px-5 py-5 md:px-10 md:py-10 bg-darkBrown flex flex-col gap-5">
                {textArr.map((txt) => (
                    <BulletPoint key={txt} text={txt} />
                ))}
            </div>
            <div className="w-full flex flex-row md:flex-row p-10 bg-olive">
                <div className="px-5 md:px-10 flex flex-col gap-5">
                    <div className="flex-1 py-5 md:py-10">
                        <p className="text-2xl text-cream text-center md:text-left">
                            {text1}
                        </p>
                    </div>
                    <div className="pl-5 md:pl-10 flex flex-col gap-10">
                        {wpArr.map((wp) => (
                            <p key={wp} className="text-2xl text-cream font-bold">
                                {wp}
                            </p>
                        ))}
                    </div>
                    <div className="flex-1 py-5 md:py-10">
                        <p className="text-2xl text-cream text-center md:text-left">
                            {text2}
                        </p>
                    </div>
                </div>
                <div className="md:h-[70vh] relative md:w-[50vw]">
                    <Image
                        src={'/images/landscaping/ian_jackson.webp'}
                        alt="Background Image"
                        fill={true}
                        style={{objectFit: "cover"}} // Ensure it's below the overlay
                    />
                </div>
            </div>
        </div>
    );
}

export default LandscapingSectionTwo;
