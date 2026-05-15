import styled from 'styled-components';

export const StyledSearchContainer = styled.div`
  display: flex;
  gap: 8px;
`;
export const StyledSearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
export const StyledSearchButton = styled.button`
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
