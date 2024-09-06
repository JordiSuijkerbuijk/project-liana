import clsx from 'clsx';

export type SectionType = {
  color?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function Section({ children, className = '', color = '' }: SectionType) {
  return (
    <section className={clsx(['w-full', className])} data-color={color}>
      <div className="z-10 h-full">{children}</div>
      <div className="absolute top-0 left-0 w-full h-full opacity-0" style={{ color: color }} />
    </section>
  );
}
