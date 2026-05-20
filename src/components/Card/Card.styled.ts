import styled from 'styled-components';

export const StyledCard = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  background-color: var(--card-background);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #f3f4f6;
    transform: translateY(-1px);
  }
`;

export const StyledCardHeader = styled.h3`
  margin: 0 0 6px;
`;

export const StyledCardDescription = styled.p`
  margin: 0;
  color: #6b7280;
`;
