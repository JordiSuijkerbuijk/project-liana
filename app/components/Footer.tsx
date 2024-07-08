import clsx from 'clsx';
import localFont from 'next/font/local';

// If loading a variable font, you don't need to specify the font weight
const drukwide = localFont({
  src: '../../public/fonts/DrukWide/Druk-Wide-Bold.ttf',
  variable: '--font-drukwide',
  display: 'swap',
});

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='sticky z-20 -top-20 bg-menu-inner text-white/40'>
      <div className='flex flex-col px-8'>
        <div
          className={clsx([
            'flex leading-none uppercase text-[12vw] overflow-hidden py-12',
            drukwide.className,
          ])}
        >
          <h2>LIANA</h2>
        </div>
        <div className='w-full h-px bg-white/20' />
        <div className='flex justify-between py-4 gap-x-4'>
          <span>Liana © {currentYear}</span>
          <a href='mailto:info@liana.com'>info@liana.com</a>
        </div>
      </div>
    </div>
  );
}
