import React, { CSSProperties, PropsWithChildren } from "react";
import "./Stack.css";

type Props = {
  vertical?: boolean;
  gap?: CSSProperties["marginTop"];
  style?: CSSProperties;
};

const Stack = ({
  vertical = false,
  gap = "8px",
  children,
  style,
  ...props
}: PropsWithChildren<Props>) => {
  const direction = vertical ? "vertical" : "horizontal";
  return (
    <div
      className={`stack ${direction}`}
      style={{
        ...style,
        "--gap": gap,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Stack;
