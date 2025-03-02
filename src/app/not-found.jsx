'use client';

import { ArrowLeft } from "@phosphor-icons/react";
import * as motion from 'framer-motion/client';
import { page_content } from "@/libs/setting-app";
import Link from "next/link";

export default function NotFound() {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen px-4"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="mb-2 font-semibold text-7xl md:text-8xl text-palette-secondary">
            404
          </h1>
          <p className="mb-8 text-md md:text-xl text-palette-secondary/80">
            The page you're looking for doesn't exist.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 border-l-4 text-palette-secondary border-l-palette-accent"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to Home
          </Link>
        </motion.div>
      </div>

      {/* Optional decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute rounded-full -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-b from-palette-accent to-palette-primary blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute rounded-full -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-t from-palette-accent to-palette-primary blur-3xl"
        />
      </div>
    </motion.main>
  );
}