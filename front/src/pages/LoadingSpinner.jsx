import React from 'react';
import {motion} from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center relative overflow-hidden w-full mt-20">
      <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity,ease:"linear", duration: 1 }}
            className="inline-block w-16 h-16 border-t-4 border-r-4 border-red-500 border-solid rounded-full"
          ></motion.div>
    </div>
  );
}

export default LoadingSpinner
