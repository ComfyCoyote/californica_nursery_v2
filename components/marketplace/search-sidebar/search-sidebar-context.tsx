'use client'


import { createContext, useContext, useState, useEffect } from 'react';

interface SearchContextProps {
    open: boolean;
    toggleOpen: () => void
    textQuery: string
    search: (searchBy: string) => void
    appWideSearch: any
    selectAttributeQuery: (attribute: string, value: any[]) => void
    selectTextQuery: (input: string) => void
    searchByOptions: string[]
}

interface SearchProviderProps {
    children: React.ReactNode
}

interface AttributesQuery {
    [key: string]: string[]
}

const SearchContext = createContext<SearchContextProps>({
    open: false,
    toggleOpen: () => {},
    textQuery: '',
    search: (searchBy: string) => {},
    appWideSearch: {},
    selectAttributeQuery: () => {},
    selectTextQuery: () => {},
    searchByOptions: ['name', 'attributes']
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider: React.FC<SearchProviderProps> = (props) => {
  const searchByOptions = ['name', 'attributes']
  
  const [open, setOpen] = useState(false);
  const [appWideSearch, setAppWideSearch] = useState({})
  const [attributesQuery, setAttributesQuery] = useState<AttributesQuery>({})
  const [textQuery, setTextQuery] = useState<string>('')

  useEffect(() => {
    const storedAppWideSearch = localStorage.getItem('appWideSearch')
    if(storedAppWideSearch){
      setAppWideSearch(JSON.parse(storedAppWideSearch))
    }
  }, [])

  console.log('appWideSearch', appWideSearch)
  console.log('attributesQuery', attributesQuery)
  
  const selectTextQuery = (input: string) => {
    console.log('input', input)
    setTextQuery(input)
  }

  const selectAttributeQuery = (attribute: string, value: any[]) => {
    if(value.length === 0){
      delete attributesQuery?.[attribute]
      setAttributesQuery({...attributesQuery})
    } else {
      setAttributesQuery({...attributesQuery, [attribute]: value})
    }
  }

  const search = (searchBy: string) => {
    const searchingObject =  {
      searchby: searchBy,
      attributes: attributesQuery,
      text: textQuery
    }
    localStorage.setItem('appWideSearch', JSON.stringify(searchingObject))
    setAppWideSearch(searchingObject)
    setOpen(false)

  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <SearchContext.Provider value={{ open, search, appWideSearch, textQuery, toggleOpen, selectAttributeQuery, selectTextQuery, searchByOptions}}>
      {props.children}
    </SearchContext.Provider>
  );
};



