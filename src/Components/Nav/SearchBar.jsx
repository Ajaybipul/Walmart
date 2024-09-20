import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Combine all items from different categories into a searchable list
  const searchableItems = [
    { name: 'mens casual slim fit', category: 'mens' },
    { name: 'mens cotton jacket', category: 'mens' },
    { name: 'Jeans for Men', category: 'mens' },
    { name: 'Slim fit Jeans', category: 'mens' },
    { name: 'Denim Jeans', category: 'mens' },
    { name: 'Trouser for Men', category: 'mens' },
    { name: 'Shirts for Men', category: 'mens' },
    { name: 'T-shirt for Mens', category: 'mens' },
    { name: 'T-shirt', category: 'mens' },
    { name: 'Shoes for mens', category: 'mens' },
    { name: 'Sneakers for mens', category: 'mens' },
    { name: 'womens t shirt', category: 'womens' },
    { name: 'women jacket', category: 'womens' },
    { name: 'Jeans for Women', category: 'womens' },
    { name: 'women saress', category: 'womens' },
    { name: 'Tops for Women', category: 'womens' },
    { name: 'Kurtis for Womens', category: 'womens' },
    { name: 'Womens kurtis', category: 'womens' },
    { name: 'Shoes for Womens', category: 'womens' },
    { name: 'ssd', category: 'electronics' },
    { name: 'hard drive', category: 'electronics' },
    { name: 'gold', category: 'jewelry' },
    { name: 'bracelet', category: 'jewelry' }
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Suggest items based on the query
    const lowerCaseQuery = value.toLowerCase();
    const matchedSuggestions = searchableItems
      .filter(item => item.name.toLowerCase().includes(lowerCaseQuery))
      .map(item => ({
        name: item.name,
        category: item.category
      }));

    setSuggestions(matchedSuggestions);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const lowerCaseQuery = query.toLowerCase();

    // Find the first category that matches the query
    const matchedCategory = searchableItems.find(item => 
      item.name.toLowerCase().includes(lowerCaseQuery)
    );

    if (matchedCategory) {
      navigate(`/${matchedCategory.category}`);
    } else {
      // If no match, handle it accordingly (e.g., show an error or go to a general search page)
      navigate('/search');
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearchSubmit} className="flex items-center bg-white text-black rounded-full overflow-hidden">
        <input
          type="text"
          className="w-full px-3 py-2 text-sm"
          placeholder="Search everything at Walmart online and in store"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className="px-4 py-2 bg-white-600 text-white">
          🔍 
        </button>
      </form>

      {/* Only show suggestions if there are matches */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 mt-2 bg-white text-black font-bold shadow-md w-full rounded-lg overflow-hidden">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-700"
                style={{ cursor: 'pointer' }}
              >
                <a href={`/${suggestion.category}`} className="block">
                  {suggestion.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
