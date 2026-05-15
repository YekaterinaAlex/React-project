import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

type Props = {
  onSearch: (value: string) => void;
  value: string;
};

function Search({ onSearch, value }: Props) {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
      />

      <SearchButton onClick={handleSearchClick}>Search</SearchButton>
    </SearchContainer>
  );
}

export default Search;

const SearchContainer = styled.div`
  display: flex;
  gap: 8px;
`;
const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const SearchButton = styled.button`
  padding: 8px 14px;
  border: none;
  background-color: #1677ff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
    &:hover {
    background-color: #f5b800;
  }
}`;
