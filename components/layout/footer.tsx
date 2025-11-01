import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <div className="bg-darkBrown py-4 px-10 w-full flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start">
      <div className="flex flex-col items-center md:items-start space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-cream">
          Californica Nursery
        </h2>
        <p className="text-xl text-cream">
          Tongva and Acjachemen Land - Long Beach, CA
        </p>
        <a href="mailto:info@californicanursery.com" className="text-xl text-cream hover:text-lime-500 transition-colors">
          info@californicanursery.com
        </a>
        <p className="text-xl text-cream">
          © {new Date().getFullYear()} Californica Nursery. All rights reserved.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-10">
        <div className="flex flex-col items-center md:items-end space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-cream">
            EXPLORE
          </h2>
          <Link href={'/about'}>
            <p className="text-xl text-cream hover:text-lime-500 transition-colors">
                ABOUT
            </p>
          </Link>
          <Link href={'/landscaping'}>
            <p className="text-xl text-cream hover:text-lime-500 transition-colors">
              LANDSCAPING
            </p>
          </Link>
          <a href={'https://www.instagram.com/californicanursery/'} target="_blank" rel="noopener noreferrer">
            <p className="text-xl text-cream hover:text-lime-500 transition-colors">
              INSTAGRAM
            </p>
          </a>
          <Link href={'/'}>
            <p className="text-xl text-cream hover:text-lime-500 transition-colors">
              HOME
            </p>
          </Link>
        </div>
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-cream">
            SHOP
          </h2>
          <Link href={'/plants'}>
            <p className="text-xl text-cream hover:text-lime-500 transition-colors">
              PLANTS
            </p>
          </Link>
          <Link href={'/seeds'}>
            <p className="text-xl text-cream hover:text-lime-500 transition-colors">
              SEEDS
            </p>
          </Link>
          <Link href={'/merch'}>
            <p className="text-xl text-cream hover:text-lime-500 transition-colors">
              MERCH
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
