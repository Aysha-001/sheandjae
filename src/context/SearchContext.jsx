/*import { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase'; // Update path

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [productNames, setProductNames] = useState([]); // Stores only name and id

  useEffect(() => {
    const fetchProductNames = async () => {
      const querySnapshot = await getDocs(
        collection(db, 'Product'),
    
      );
      const names = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name // Only fetching name and id
      }));
      setProductNames(names);
      console.log(names)
    };
    fetchProductNames();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 0) {
      const results = productNames.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <SearchContext.Provider value={{ searchTerm, searchResults, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}*/