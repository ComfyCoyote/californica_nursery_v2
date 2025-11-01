
/**
import { useState } from 'react';
import { useSearch } from './search-sidebar-context';
import AttributeSearch from './attribute-search';
import SearchBar from './searchbar';

interface SearchSidebarPropTypes {
  type: string;
}

const SearchSidebar: React.FC<SearchSidebarPropTypes> = ({ type }) => {
  const { open, search, toggleOpen } = useSearch();
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <div className={`fixed right-0 top-0 w-[320px] h-full bg-darkBrown transition-all duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} z-50`}>
      <div className="flex justify-end p-4">
        <button 
          onClick={toggleOpen} 
          className="text-cream hover:text-lime"
        >
          ✕
        </button>
      </div>
      <h2 className="text-cream text-xl px-4 mb-4">Search</h2>
      <div className="p-4">
        <div className="bg-olive rounded-lg">
          <div className="border-b border-cream/20">
            <div className="flex space-x-2 p-3">
              <button 
                onClick={() => setTabIndex(0)}
                className={`flex-1 px-4 py-2 text-center text-cream rounded-t-lg ${tabIndex === 0 ? 'bg-cream/10' : ''}`}
              >
                Search by name
              </button>
              <button 
                onClick={() => setTabIndex(1)}
                className={`flex-1 px-4 py-2 text-center text-cream rounded-t-lg ${tabIndex === 1 ? 'bg-cream/10' : ''}`}
              >
                Search by attributes
              </button>
            </div>
          </div>
          <div className="p-4">
            {tabIndex === 0 && <SearchBar type={type} />}
            {tabIndex === 1 && <AttributeSearch type={type} />}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-olive p-4">
        <button 
          onClick={(e) => { search(true, tabIndex) }}
          className="w-full bg-lime text-cream py-2 px-4 rounded-lg text-sm hover:bg-lime/90"
        >
          search
        </button>
      </div>
    </div>
  );
};

export default SearchSidebar;
*/
