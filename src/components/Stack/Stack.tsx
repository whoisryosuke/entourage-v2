import React, { PropsWithChildren } from "react";
import "./Stack.css";

type Props = {
  vertical?: boolean;
};

const Stack = ({
  vertical = false,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const direction = vertical ? "vertical" : "horizontal";
  return (
    <div className={`stack ${direction}`} {...props}>
      {children}
    </div>
  );
};

export default Stack;
