import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import palette from '@/utils/palette/palette';

interface NavbarDropdownProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const NavDropdownMobile: React.FC<NavbarDropdownProps> = ({isOpen, setIsOpen }) => {

  
  const options = [
    { value: 'option1', label: 'PLANTS', bgColor: 'lime', hoverColor: 'green-hover', href: '/plants'},
    { value: 'option2', label: 'SEEDS', bgColor: 'skyblue', hoverColor: 'blue-hover', href: '/seeds' },
    { value: 'option3', label: 'MERCH', bgColor: 'pink', hoverColor: 'purple-hover', href: '/merch' },
    { value: 'option4', label: 'LANDSCAPING', bgColor: 'orange-natural', hoverColor: 'orange-natural-hover', href: '/landscaping' },
    { value: 'option5', label: 'ABOUT', bgColor: 'yellow-natural', hoverColor: 'yellow-natural-hover', href: '/about' },
  ]

  return (
    <div>
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen()}
          className="w-12 h-12 bg-dark-green rounded-full flex items-center justify-center text-lime-500 text-2xl hover:bg-transparent"
        >
          <FaBars color='#c0d84d'/>
        </button>
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity" onClick={() => setIsOpen()}>
        <div className="w-[200px] mt-18 bg-white absolute top-[100px] right-[90px] z-1000">
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

export default NavDropdownMobile;
