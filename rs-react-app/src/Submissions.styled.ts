import styled from 'styled-components';

export const StyledSubmissions = styled.section`
  margin-top: 32px;
`;

export const StyledCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

export const StyledCard = styled.article<{ $isNew: boolean }>`
  padding: 16px;
  border: 5px solid ${({ $isNew }) => ($isNew ? '#4caf50' : '#ddd')};
  border-radius: 12px;
  background-color: ${({ $isNew }) => ($isNew ? '#e8f5e9' : 'white')};
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 200px;

  object-fit: cover;

  border-radius: 8px;
`;

export const StyledCardTitle = styled.h3`
  margin: 12px 0 8px;
`;

export const StyledCardText = styled.p`
  margin: 4px 0;
`;

export const StyledBadge = styled.span`
  display: inline-block;

  margin-left: 8px;
  padding: 2px 8px;

  border-radius: 12px;

  background-color: #e8f5e9;

  font-size: 12px;
  font-weight: 600;
`;
