"use client";

import { motion } from "framer-motion";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      
      {/* Outer rotating ring */}
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
      />

      {/* Inner pulse dot */}
      <motion.div
        className="absolute w-3 h-3 bg-primary rounded-full"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
        }}
      />

      {/* Brand glow background */}
      <div className="absolute w-40 h-40 bg-gradient-primary opacity-10 blur-3xl rounded-full" />
    </div>
  );
};

export default GlobalLoader;