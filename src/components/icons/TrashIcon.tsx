import * as React from "react";
type Props = React.SVGProps<SVGSVGElement> & {
  fill?: React.CSSProperties["fill"];
};
const TrashIcon = ({ fill = "var(--fill, #484848)", ...props }: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Trash</title>
    <path
      d="M5.00293 20C5.00293 21.103 5.89993 22 7.00293 22H17.0029C18.1059 22 19.0029 21.103 19.0029 20V8H21.0029V6H18.0029H17.0029V4C17.0029 2.897 16.1059 2 15.0029 2H9.00293C7.89993 2 7.00293 2.897 7.00293 4V6H6.00293H3.00293V8H5.00293V20ZM9.00293 4H15.0029V6H9.00293V4ZM8.00293 8H16.0029H17.0029L17.0039 20H7.00293V8H8.00293Z"
      fill={fill}
    />
    <path
      d="M9.00293 10H11.0029V18H9.00293V10ZM13.0029 10H15.0029V18H13.0029V10Z"
      fill={fill}
    />
  </svg>
);
export default TrashIcon;
