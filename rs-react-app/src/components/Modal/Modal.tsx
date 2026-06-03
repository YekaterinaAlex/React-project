import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { StyledCloseButton, StyledModal, StyledOverlay } from './Modal.styled';

import type { ModalProps } from './modal.types';

function Modal({ isOpen, onClose, children }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <StyledOverlay onClick={onClose}>
      <StyledModal
        role="dialog"
        aria-modal="true"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <StyledCloseButton ref={closeButtonRef} onClick={onClose}>
          Close
        </StyledCloseButton>

        {children}
      </StyledModal>
    </StyledOverlay>,
    document.body
  );
}

export default Modal;
