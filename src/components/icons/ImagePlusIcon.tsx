import * as React from "react";
type Props = React.SVGProps<SVGSVGElement> & {
  fill?: React.CSSProperties["fill"];
};
const ImagePlusIcon = ({ fill = "var(--fill, #EEE)", ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill={fill}
      d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5Z"
    />
    <path fill={fill} d="m8 11-3 4h11l-4-6-3 4-1-2Z" />
    <path fill={fill} d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3Z" />
  </svg>
);
export default ImagePlusIcon;
