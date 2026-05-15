import React, { useMemo, useState, useEffect } from 'react';

import { debounce } from '../../utils/debounce';

import {
  StyledSearchContainer,
  StyledSearchButton,
  StyledSearchInput,
} from './Search.styled';

import type { SearchProps } from './search.type';

function Search({ onSearch, value }: SearchProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

  const handleSearchClick = () => {
    debouncedSearch(inputValue);
  };

  return (
    <StyledSearchContainer>
      <StyledSearchInput
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
      />

      <StyledSearchButton onClick={handleSearchClick}>
        Search
      </StyledSearchButton>
    </StyledSearchContainer>
  );
}

export default Search;
