import AddressBook from './types/AddressBook';
import Arrow from './types/Arrow';
import Browser from './types/Browser';
import Home from './types/Home';
import SpeechBubble from './types/SpeechBubble';

export type IconItemProps = {
  className?: string;
  pathClass?: string;
};

export const iconsMap = {
  home: Home,
  browser: Browser,
  addressBook: AddressBook,
  speechBubble: SpeechBubble,
  arrow: Arrow,
};

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
