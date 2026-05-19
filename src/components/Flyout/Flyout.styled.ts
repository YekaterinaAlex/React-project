import styled from 'styled-components';

export const StyledFlyout = styled.div`
  position: sticky;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  font-family: 'Courier New', Courier, monospace;
  padding: 8px;
  background: grey;
  border: 1px solid black;
`;

export const StyledFlyoutButton = styled.button`
  padding: 8px 14px;
  border: none;
  background-color: #1677ff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #f5b800;
  }
`;
