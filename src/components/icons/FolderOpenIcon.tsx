import * as React from "react";
type Props = React.SVGProps<SVGSVGElement> & {
  fill?: React.CSSProperties["fill"];
};
const FolderOpenIcon = ({ fill = "var(--fill, #EEE)", ...props }: Props) => (
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
      d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V7c0-1.103-.897-2-2-2h-6.1L9.616 3.213A.997.997 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14h.007a1 1 0 0 0 .158.551ZM17.341 18H4.517l2.143-5h12.824l-2.143 5ZM18 7v4H6c-.4 0-.762.238-.919.606L4 14.129V7h14Z"
    />
  </svg>
);
export default FolderOpenIcon;
