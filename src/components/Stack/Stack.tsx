import React, { CSSProperties, PropsWithChildren } from "react";
import "./Stack.css";

type Props = {
  vertical?: boolean;
  gap?: CSSProperties["marginTop"];
  style?: CSSProperties;
  className?: string;
};

const Stack = ({
  vertical = false,
  gap = "8px",
  children,
  style,
  className = "",
  ...props
}: PropsWithChildren<Props>) => {
  const direction = vertical ? "vertical" : "horizontal";
  return (
    <div
      className={`stack ${direction} ${className}`}
      style={
        {
          ...style,
          "--gap": gap,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
};

export default Stack;
