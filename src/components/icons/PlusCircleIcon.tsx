import * as React from "react";
type Props = React.SVGProps<SVGSVGElement> & {
  fill?: React.CSSProperties["fill"];
};
const PlusCircleIcon = ({ fill = "var(--fill, #EEE)", ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path fill={fill} d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7Z" />
    <path
      fill={fill}
      d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2Zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8Z"
    />
  </svg>
);
export default PlusCircleIcon;
