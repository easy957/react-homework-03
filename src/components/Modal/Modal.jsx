import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  function onBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <div className={s.Backdrop} onClick={onBackdropClick}>
      <div className={s.Backdrop__content}>{children}</div>
    </div>,
    modalRoot
  );
}
