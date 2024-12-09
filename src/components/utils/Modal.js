"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

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
      transition: { duration: 0.5, type: "spring", stiffness: 50 },
    },
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 min-w-full min-h-screen my-5 flex items-center justify-center backdrop-blur-sm backdrop-opacity-80"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
      onClick={onClose} // close on backdrop click
    >
      <motion.div
        className="relative w-full max-w-lg p-6 mx-4 text-[#242424] bg-white rounded-lg"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button
          className="absolute text-xl font-bold top-2 right-5"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Content */}
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
