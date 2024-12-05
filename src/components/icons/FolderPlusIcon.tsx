import * as React from "react";
type Props = React.SVGProps<SVGSVGElement> & {
  fill?: React.CSSProperties["fill"];
};
const FolderPlusIcon = ({ fill = "var(--fill, #EEE)", ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path fill={fill} d="M13 9h-2v3H8v2h3v3h2v-3h3v-2h-3V9Z" />
    <path
      fill={fill}
      d="M20 5h-8.586L9.707 3.293A.996.996 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2ZM4 19V7h16l.002 12H4Z"
    />
  </svg>
);
export default FolderPlusIcon;
