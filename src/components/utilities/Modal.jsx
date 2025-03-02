"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XSquare } from "@phosphor-icons/react";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, type: "spring", stiffness: 100 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center min-w-full min-h-screen backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose} // close on backdrop click
        >
          <motion.div
            className="relative w-full max-w-2xl p-6 mx-4 rounded-lg text-palette-dark bg-palette-secondary"
            variants={modalVariants}
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <button
              className="absolute text-xl font-bold md:hidden top-2 right-5"
              onClick={onClose}
            >
              <XSquare size={24} weight="fill" className="text-palette-primary" />
            </button>
            <button
              className="absolute hidden px-2 text-xs font-medium rounded-md md:flex bg-palette-primary text-palette-secondary top-2 right-5"
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
      )}
    </AnimatePresence>
  );
};

export default Modal;
