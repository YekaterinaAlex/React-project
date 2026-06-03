import { createPortal } from 'react-dom';

import { StyledCloseButton, StyledModal, StyledOverlay } from './Modal.styled';

import type { ModalProps } from './modal.types';

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <StyledOverlay onClick={onClose}>
      <StyledModal
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <StyledCloseButton onClick={onClose}>Close</StyledCloseButton>
        {children}
      </StyledModal>
    </StyledOverlay>,
    document.body
  );
}

export default Modal;
