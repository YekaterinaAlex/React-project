import React from 'react';
import './Search.css';
import { useState } from 'react';

type Props = {
  onSearch: (value: string) => void;
  value: string;
};

function Search({ onSearch, value }: Props) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
      />
      <button className="search-button" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
}

export default Search;
