import clsx from 'clsx';

import Icon from '@/components/Icon/Icon';

export default function DisappearingArrow({ arrowClass }: { arrowClass?: string }) {
  return (
    <span className="relative inline-block w-6 overflow-hidden aspect-square group group-hover:translate-x-1">
      <span className="flex items-center justify-center w-full h-full transition-transform translate-x-0 group-hover:translate-x-full">
        <Icon type="arrow" className={clsx('p-px', arrowClass)} />
      </span>
      <span className="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-transform -translate-x-full group-hover:translate-x-0">
        <Icon type="arrow" className={clsx('p-px', arrowClass)} />
      </span>
    </span>
  );
}
