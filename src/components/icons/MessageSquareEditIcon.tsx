import * as React from "react";
type Props = React.SVGProps<SVGSVGElement> & {
  fill?: React.CSSProperties["fill"];
};
const MessageSquareEditIcon = ({
  fill = "var(--fill, #EEE)",
  ...props
}: Props) => (
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
      d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6Zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8Z"
    />
    <path
      fill={fill}
      d="M7 14.987v1.999h1.999l5.529-5.522-1.998-1.998L7 14.987ZM15.47 10.522l-1.998-2L14.996 7l1.998 1.999-1.523 1.524Z"
    />
  </svg>
);
export default MessageSquareEditIcon;
