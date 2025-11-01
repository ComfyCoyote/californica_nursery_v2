'use client'

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

interface LinkIconPropTypes {
    iconName: string;
    color: string;
}

const LinkIcon: React.FC<LinkIconPropTypes> = ({ iconName, color }) => {
    const [hover, setHover] = useState(false);
    console.log(color)
    return (
        <div className="flex flex-col items-center">
            <div className="w-[350px] h-[350px]">
            <Link href={`/${iconName}`}>
                <Image
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    style={{ cursor: 'pointer' }}
                    src={hover ? `/animations/${iconName}ani.gif` : `/images/landing/${iconName}.PNG`}
                    alt="Icon"
                    width={350}
                    height={350}
                />
            </Link>
            </div>
            <Link href={`/${iconName}`}>
                <button
                   style={{ backgroundColor: color }}
                    className={`
                        border-2 border-black
                        text-black
                        px-4 py-2
                        hover:bg-opacity-90
                        transition-colors
                        w-full
                        max-w-[350px]
                    `}
                >
                    {iconName.toUpperCase()}
                </button>
            </Link>
        </div>
    );
};

export default LinkIcon;
