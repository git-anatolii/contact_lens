'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hook';
import { RootState } from 'src/lib/store';
import { restoreError } from 'src/lib/reducers/userSlice';

interface AlertProps {
  message?: string;
  className?: string;
}

const AlertFailure: React.FC<AlertProps> = ({ message, className }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      dispatch(restoreError());
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`w-full h-full py-4 px-5 text-13px md:text-sm text-brand-danger font-semibold flex items-center justify-center ${className}`}
    >
      {message}
    </div>
  );
};

export default AlertFailure;
