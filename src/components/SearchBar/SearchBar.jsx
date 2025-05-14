// SearchBar.jsx
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // Icône de recherche

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
    // Vous pouvez aussi appeler onSearch à chaque changement si vous préférez une recherche en direct
    // onSearch(event.target.value); 
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 w-full max-w-lg mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Rechercher dans vos notes..."
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-gray-700"
          aria-label="Barre de recherche"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-indigo-500"
          aria-label="Lancer la recherche"
        >
          <FiSearch className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;