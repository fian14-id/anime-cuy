"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ProhibitInset, X, XSquare } from "@phosphor-icons/react";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 50 },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 min-w-full min-h-screen my-5 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
      onClick={onClose} // close on backdrop click
    >
      <motion.div
        className="relative w-full max-w-lg p-6 mx-4 text-palette-dark bg-palette-secondary rounded-lg"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button
          className="absolute md:hidden text-xl font-bold top-2 right-5"
          onClick={onClose}
        >
          <XSquare size={24} weight="fill" className="text-palette-primary" />
        </button>
        <button
          className="absolute hidden md:flex text-xs bg-palette-primary px-2 rounded-md text-palette-secondary font-medium top-2 right-5"
          onClick={onClose}
        >
          <kbd>
            <abbr title="Escape">ESC</abbr>
          </kbd>
        </button>


        {/* Modal Content */}
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
