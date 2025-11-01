import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <div className="bg-darkBrown py-4 px-10 w-full flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start">
      <div className="flex flex-col items-center md:items-start space-y-2">
        <h2 className="text-lg md:text-3xl font-bold text-cream">
          Californica Nursery
        </h2>
        <p className="md:text-xl text-[10px] text-cream text-center">
          Tongva and Acjachemen Land - Long Beach, CA
        </p>
        <a href="mailto:info@californicanursery.com" className="md:text-xl text-[10px] text-center text-cream hover:text-lime-500 transition-colors">
          info@californicanursery.com
        </a>
        <p className="md:text-xl text-[10px] text-center text-cream">
          © {new Date().getFullYear()} Californica Nursery. All rights reserved.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-10">
        <div className="flex flex-col items-center md:items-end space-y-2">
          <h2 className="md:text-xl text-md font-bold text-cream">
            EXPLORE
          </h2>
          <Link href={'/about'}>
            <p className="md:text-xl text-sm text-cream hover:text-lime-500 transition-colors">
                ABOUT
            </p>
          </Link>
          <Link href={'/landscaping'}>
            <p className="md:text-xl text-sm text-cream hover:text-lime-500 transition-colors">
              LANDSCAPING
            </p>
          </Link>
          <a href={'https://www.instagram.com/californicanursery/'} target="_blank" rel="noopener noreferrer">
            <p className="md:text-xl text-sm text-cream hover:text-lime-500 transition-colors">
              INSTAGRAM
            </p>
          </a>
        </div>
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h2 className="md:text-xl text-md font-bold text-cream">
            SHOP
          </h2>
          <Link href={'/plants'}>
            <p className="md:text-xl text-sm text-cream hover:text-lime-500 transition-colors">
              PLANTS
            </p>
          </Link>
          <Link href={'/seeds'}>
            <p className="md:text-xl text-sm text-cream hover:text-lime-500 transition-colors">
              SEEDS
            </p>
          </Link>
          <Link href={'/merch'}>
            <p className="md:text-xl text-sm text-cream hover:text-lime-500 transition-colors">
              MERCH
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
