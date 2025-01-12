'use client';

import { useEffect } from 'react';

export function useClickOutside({
  divRef,
  setIsOpen,
}: {
  divRef: React.RefObject<HTMLDivElement | null>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedInsideInput = divRef?.current?.contains(event.target as Node);
      if (!clickedInsideInput) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [divRef, setIsOpen]);
}

export default useClickOutside;
