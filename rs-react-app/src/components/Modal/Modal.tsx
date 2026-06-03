import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import { StyledCloseButton, StyledModal, StyledOverlay } from './Modal.styled';

import type { ModalProps } from './modal.types';

function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
