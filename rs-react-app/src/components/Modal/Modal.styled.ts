import styled from 'styled-components';

export const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const StyledModal = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 90vh;

  padding: 24px;

  overflow-y: auto;

  border-radius: 12px;
  background-color: white;
`;

export const StyledCloseButton = styled.button`
  margin-bottom: 16px;
`;
