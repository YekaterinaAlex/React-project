import styled from 'styled-components';

export const AppWrapper = styled.div`
  padding: 20px;
  font-family: 'Courier New', Courier, monospace;

  background-color: ${({ theme }) => theme.background};

  color: ${({ theme }) => theme.text};

  min-height: 100vh;
`;

export const SearchSection = styled.section`
  margin-bottom: 30px;
  padding: 20px;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};

  background-color: ${({ theme }) => theme.cardBackground};
`;

export const ResultSection = styled.section`
  flex: 1;
  min-height: 200px;

  padding: 20px;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};

  background-color: ${({ theme }) => theme.cardBackground};
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

  border: none;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.buttonBackground};

  color: ${({ theme }) => theme.text};

  cursor: pointer;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackground};
  }
`;

export const DetailsSection = styled.section`
  width: 300px;

  padding: 16px;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};

  background-color: ${({ theme }) => theme.cardBackground};
`;
