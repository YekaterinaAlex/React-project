import styled from 'styled-components';

export const StyledCard = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  text-align: left;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.cardHoverBackground};
    transform: translateY(-1px);
  }
`;

export const StyledCardHeader = styled.h3`
  margin: 0 0 6px;
`;

export const StyledCardDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.descriptionText};
`;

export const StyledCardCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.buttonBackground};
  flex-shrink: 0;
`;
