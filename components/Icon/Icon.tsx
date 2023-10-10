import Home from './types/Home'

export type IconItemProps = {
  className?: string;
  pathClass?: string;
};

const iconsMap = {
  home: Home
}

type IconProps = {
  type: keyof typeof iconsMap;
  className?: string;
  pathClass?: string;
};

export const Icon = ({ type, className, pathClass, ...rest }: IconProps): JSX.Element | null => {
  const IconComp = iconsMap[type];
  if (!IconComp) return null;
  return <IconComp className={className} pathClass={pathClass} {...rest} />;
};

export default Icon;
