import React, { ReactNode, useEffect } from "react";

type ModalProps = {
  children: ReactNode;
};

const Modal = (props: ModalProps) => {
  const { children } = props;

  return (
    <div className="fixed flex items-center justify-center bg-[rgba(0,0,0,0.5)] inset-0 z-20 backdrop-blur-sm">
      {children}
    </div>
  );
};

export default Modal;
