import { ComponentProps, CSSProperties, PropsWithChildren } from "react";

type Props = ComponentProps<"input"> & {
  containerStyle?: CSSProperties;
};

const Input = ({
  children,
  containerStyle = {},
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <div className="Input" style={containerStyle}>
      <input {...props}>{children}</input>
    </div>
  );
};

export default Input;
