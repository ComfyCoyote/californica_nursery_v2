import Image from "next/image";
import SocialMediaIcons from "./social-media-icons";

const LeftSection: React.FC = () => {
    return (
        <div className="flex flex-col items-center md:items-start w-full md:w-[500px]">
            <div>
                <Image
                    src="/animations/contactani.gif" 
                    alt="phone animation" 
                    width={350} 
                    height={350} 
                    className="w-[350px] h-[350px]"
                />
            </div>
        </div>
    );
};

export default LeftSection;
