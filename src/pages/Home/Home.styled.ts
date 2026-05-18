import styled from 'styled-components';

export const AppWrapper = styled.div`
  padding: 20px;
  font-family: 'Courier New', Courier, monospace;
`;

export const SearchSection = styled.section`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid black;
  background-color: lightgray;
`;

export const ResultSection = styled.section`
  padding: 20px;
  border: 1px solid black;
  background-color: lightslategrey;
  min-height: 200px;
  flex: 1;
`;

export const Layout = styled.div`
  display: flex;
  gap: 20px;
`;

export const ErrorButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const ErrorButton = styled.button`
  padding: 8px 14px;
  background-color: #ff4d4f;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #f5b800;
  }
`;

export const DetailsSection = styled.section`
 width: 300px;
  border-left: 1px solid lightgrey;
  padding: 10px;
}
  `;
