import React from "react";
import Image from "next/image";
import Modal from "../layouts/modal";

type LoadingModalProps = {
  loading: boolean;
};

const LoadingModal = (prop: LoadingModalProps) => {
  const { loading } = prop;

  if (!loading) return null;

  return (
    <Modal>
      <div className="relative w-20 h-20 animate__animated animate__heartBeat animate__infinite">
        <Image
          src="/assets/images/logo.png"
          alt="Loading Logo"
          fill
          className="object-contain"
        />
      </div>
    </Modal>
  );
};

export default LoadingModal;
