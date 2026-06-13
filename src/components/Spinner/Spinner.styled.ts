import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const StyledSpinner = styled.div`
  width: 40px;
  height: 40px;
  margin: 20px auto;

  border: 4px solid ${({ theme }) => theme.cardBackground};
  border-top: 4px solid ${({ theme }) => theme.buttonBackground};
  border-radius: 50%;

  animation: ${spin} 1s linear infinite;
`;
