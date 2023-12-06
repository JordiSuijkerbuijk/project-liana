import Icon from "@/components/Icon/Icon";
import clsx from "clsx";

export default function DisappearingArrow({
  arrowClass,
}: {
  arrowClass?: string;
}) {
  return (
    <span className="relative inline-block w-6 aspect-square overflow-hidden group group-hover:translate-x-1">
      <span className="inline-block w-full h-full translate-x-0 transition-transform group-hover:translate-x-full">
        <Icon type="arrow" className={clsx("p-px", arrowClass)} />
      </span>
      <span className="absolute inline-block w-full h-full left-0 top-0 -translate-x-full transition-transform group-hover:translate-x-0">
        <Icon type="arrow" className={clsx("p-px", arrowClass)} />
      </span>
    </span>
  );
}
