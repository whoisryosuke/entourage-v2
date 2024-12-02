import * as React from "react";
import { SVGProps } from "react";
const AppLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={172}
    height={135}
    fill="none"
    viewBox="0 0 172 135"
    {...props}
  >
    <title>Entourage Logo</title>
    <path
      fill="var(--fill, #000)"
      d="M.934 135V20.141c0-8.183 1.461-13.444 4.384-15.782C8.24 1.826 13.988.56 22.56.56h148.761v33.903H67.57v16.074h93.523v33.61H67.57v16.952h103.752V135H.934Z"
    />
  </svg>
);
export default AppLogo;
