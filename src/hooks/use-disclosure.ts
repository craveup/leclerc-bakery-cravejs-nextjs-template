import { useState } from "react";

function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onToggle: () => setIsOpen((prev) => !prev),
  };
}

export default useDisclosure;
