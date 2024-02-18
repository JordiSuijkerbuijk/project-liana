import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  withPadding?: boolean;
};

export default function Container({ children, withPadding = true, className }: Props) {
  return (
    <div className={clsx("mx-auto max-w-[80rem]", withPadding && "p-5 lg:p-10", className)}>{children}</div>
  );
}
