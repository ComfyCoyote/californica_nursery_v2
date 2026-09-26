import React from 'react';
import Link from 'next/link';
import palette from '@/utils/palette/palette';

interface NavbarDropdownProps {
  options: { value: string; label: string; bgColor: string; hoverColor: string; href: string }[];
  placeholder?: string;
  isOpen: boolean;
  setIsOpen: () => void;
  xPosition?: string;
  yPosition?: string;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ options, placeholder, isOpen, setIsOpen, xPosition }) => {

  return (
    <div>
      <button
        onClick={() => setIsOpen()}
        className="text-white text-2xl hover:bg-transparent"
      >
        <span className="text-cream">{placeholder?.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setIsOpen()}>
        <div 
          className={`w-[200px] mt-2 bg-white absolute top-[100px] z-50`}
          style={{ right: `${xPosition}` }}
        >
            <div className="w-full flex flex-col space-y-0">
              {options.map((option) => (
                <Link
                  key={option.value} 
                  href={option.href}
                  onClick={() => setIsOpen()}
                >
                  <div 
                    style={{ backgroundColor: palette[option.bgColor] }} 
                    className={`flex items-center justify-center hover:cursor-pointer w-full text-black p-2`}>
                    {option.label}
                  </div>
                </Link>
              ))}
            </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
