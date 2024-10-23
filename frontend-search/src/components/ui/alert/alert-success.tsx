'use client';

import React, { useState, useEffect } from 'react';

interface AlertProps {
  message?: string;
  className?: string;
}

const AlertSuccess: React.FC<AlertProps> = ({ message, className }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;
  
  return (
    <div
      className={`w-full h-full py-4 px-5 text-13px md:text-sm text-brand-tree font-semibold flex items-center justify-center ${className}`}
    >
      {message}
    </div>
  );
};

export default AlertSuccess;
