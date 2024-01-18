import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  return (
    <div className={clsx("px-8 mx-auto max-w-[80rem]", className)}>{children}</div>
  );
}
