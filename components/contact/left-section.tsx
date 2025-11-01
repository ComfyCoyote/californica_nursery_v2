import Image from "next/image";
import SocialMediaIcons from "./social-media-icons";

const LeftSection: React.FC = () => {
    return (
        <div className="flex flex-col items-center md:items-start w-full md:w-[500px]">
            <p className="text-2xl text-cream">
                Feel free to contact us for any inquiries, and we will get back to you as soon as possible
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2">
                <span className="text-2xl font-semibold text-cream">Email: </span>
                <a 
                    href="mailto:info@californicanursery.com" 
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className="text-xl text-cream">info@californicanursery.com</span>
                </a>
            </div>
            <SocialMediaIcons />
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
