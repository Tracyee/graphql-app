import React from 'react';
import BackDrop from '../backdrop/backdrop';

import './baseModal.less';

type ModalBaseProps = {
  show: boolean;
  title: string;
  confirmText?: string;
  children: React.ReactNode;
  onClose: VoidFunction;
  onConfirm: React.FormEventHandler<HTMLButtonElement>;
};

const ModalBase = ({
  show,
  title,
  confirmText,
  children,
  onClose,
  onConfirm,
}: ModalBaseProps): JSX.Element | null =>
  show ? (
    <>
      <BackDrop />
      <div className="modal">
        <header className="modal-header">
          <h1>{title}</h1>
        </header>
        <section className="modal-content">{children}</section>
        <section className="modal-actions">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </section>
      </div>
    </>
  ) : null;

ModalBase.defaultProps = {
  confirmText: 'Confirm',
};

export default ModalBase;