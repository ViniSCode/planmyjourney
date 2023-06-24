import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  transportation?: boolean;
}

export function TransportationButton({
  children,
  transportation,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      className={` bg-gray-200 rounded-lg w-12 h-12 flex items-center justify-center text-gray-700 ${
        transportation === true && "button-blue-bg text-white"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
