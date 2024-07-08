'use client';

import { useCallback, useMemo, useState } from 'react';

export default function ColorChange() {
  const colors = useMemo(() => ['default', 'red', 'dark', 'grey', 'navy'], []);
  const [currentColor, setCurrentColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );

  const handleColorChange = useCallback(() => {
    const bodyElement = document.querySelector('body');

    if (bodyElement) {
      const newColor = colors[Math.floor(Math.random() * colors.length)];

      // TODO: make this more efficient didn't feel like thinking of a clean
      // way. Quick fix for making sure colors aren't repeated
      if (newColor === currentColor) {
        handleColorChange();
        return;
      }

      bodyElement.classList.add(newColor);

      if (newColor !== currentColor) {
        bodyElement.classList.remove(currentColor);
      }

      setCurrentColor(newColor);
    }
  }, [colors, currentColor]);

  return (
    <button
      onClick={() => handleColorChange()}
      className='fixed z-20 w-8 h-8 p-1 rounded-md top-9 right-6 bg-menu-backdrop group'
    >
      <div className='flex items-center justify-between w-full h-full overflow-hidden rounded-sm gap-x-4 bg-menu'>
        <div className='w-full transition-transform rotate-45 bg-white h-9 translate-x-1/3 translate-y-1/3 group-hover:-translate-y-1/3 group-hover:-translate-x-1/3' />
      </div>
    </button>
  );
}
