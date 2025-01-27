import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
interface MainModalProps {
  isOpen: boolean;
  onOpenChange: VoidFunction;
  title: string;
  content: React.ReactElement;
}

export default function MainModal({
  isOpen,
  onOpenChange,
  title,
  content,
}: MainModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{content}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
