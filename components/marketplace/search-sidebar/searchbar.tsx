import { FaSearch } from 'react-icons/fa';
import { useSearch } from './search-sidebar-context';

interface SearchBarPropTypes {
    type: string
}


const SearchBar: React.FC<SearchBarPropTypes> = ({type}) => {
 
    const { textQuery, selectTextQuery, search, searchByOptions } = useSearch()

    return (
        <div className="w-full px-5 md:max-w-[400px] md:mx-auto">
            <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    className="w-full md:pl-10 md:pr-4 py-2 bg-darkBrown text-cream rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={textQuery}
                    onChange={(e) => selectTextQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            search(searchByOptions[0]);
                        }
                    }}
                    placeholder={placeholder()}
                />
            </div>
        </div>
    );

    function placeholder(){
        if(type === 'merch'){
            return 'Search a merchandise item'
        }else if(type === 'plants'){
            return 'Search a specific plant'
        }else if(type === 'seeds'){
            return "Search a seeds item"
        }

        return ''
    }
};

export default SearchBar;








