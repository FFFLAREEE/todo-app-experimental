



"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  children,
}) => {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="sr-only">Task modal</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;