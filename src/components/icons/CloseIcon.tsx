import * as React from "react";
import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  fill?: React.CSSProperties["fill"];
};
const CloseIcon = ({ fill = "#484848", ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill={fill}
      d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242-1.414-1.414Z"
    />
  </svg>
);
export default CloseIcon;
