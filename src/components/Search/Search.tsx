import React, { useState } from 'react';

import {
  StyledSearchContainer,
  StyledSearchButton,
  StyledSearchInput,
} from './Search.styled';

import type { SearchProps } from './search.type';

function Search({ value }: SearchProps) {
  const [inputValue, setInputValue] = useState(value);

  return (
    <form action="/" method="GET">
      <StyledSearchContainer>
        <StyledSearchInput
          name="search"
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <input type="hidden" name="page" value="1" />

        <StyledSearchButton type="submit">Search</StyledSearchButton>
      </StyledSearchContainer>
    </form>
  );
}

export default Search;
