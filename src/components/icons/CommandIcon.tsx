import * as React from "react";
import { SVGProps } from "react";
type Props = SVGProps<SVGSVGElement> & {
  fill?: React.CSSProperties["fill"];
};
const CommandIcon = ({ fill = "var(--fill, #EEE)", ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={fill}
      d="M6 14c-2.206 0-4 1.794-4 4s1.794 4 4 4a4.003 4.003 0 0 0 3.998-3.98H10V16h4v2.039h.004A4.002 4.002 0 0 0 18 22c2.206 0 4-1.794 4-4s-1.794-4-4-4h-2v-4h2c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4v2h-4V5.98h-.002A4.003 4.003 0 0 0 6 2C3.794 2 2 3.794 2 6s1.794 4 4 4h2v4H6Zm2 4c0 1.122-.879 2-2 2s-2-.878-2-2c0-1.122.879-2 2-2h2v2Zm10-2c1.121 0 2 .878 2 2 0 1.122-.879 2-2 2s-2-.878-2-2v-2h2ZM16 6c0-1.122.879-2 2-2s2 .878 2 2c0 1.122-.879 2-2 2h-2V6ZM6 8c-1.121 0-2-.878-2-2 0-1.122.879-2 2-2s2 .878 2 2v2H6Zm4 2h4v4h-4v-4Z"
    />
  </svg>
);
export default CommandIcon;
