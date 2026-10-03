'use client'

import * as Menubar from '@radix-ui/react-menubar';
import Link from 'next/link';
import palette from '@/utils/palette/palette';

interface NavbarDropdownProps {
  value: string;
  options: { value: string; label: string; bgColor: string; hoverColor: string; href: string }[];
  placeholder?: string;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ value, options, placeholder }) => {
  return (
    <Menubar.Menu value={value}>
      <Menubar.Trigger className="text-cream text-2xl bg-transparent hover:bg-transparent cursor-pointer outline-none">
        {placeholder?.toUpperCase()}
      </Menubar.Trigger>

      <Menubar.Portal>
        <Menubar.Content
          align="center"
          className="w-[200px] mt-[20px] bg-white z-50 shadow-md"
        >
          {options.map((option) => (
            <Menubar.Item key={option.value} asChild>
              <Link href={option.href}>
                <div
                  style={{ backgroundColor: palette[option.bgColor] }}
                  className="flex items-center justify-center cursor-pointer w-full text-black p-2 outline-none"
                >
                  {option.label}
                </div>
              </Link>
            </Menubar.Item>
          ))}
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  );
};

export default NavbarDropdown;
