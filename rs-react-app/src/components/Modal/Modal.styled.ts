import styled from 'styled-components';

export const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const StyledModal = styled.div`
  min-width: 400px;
  padding: 24px;
  background-color: white;
`;

export const StyledCloseButton = styled.div`
  margin-bottom: 16px;
`;
