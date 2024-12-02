import { PropsWithChildren } from "react";
import bgImg from "../assets/images/bg.png";

type Props = {};

const AppWrapper = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <div
      className="AppWrapper"
      style={{ backgroundImage: `url(${bgImg})` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AppWrapper;
