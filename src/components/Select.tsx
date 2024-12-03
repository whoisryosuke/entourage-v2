import { ComponentProps, CSSProperties, PropsWithChildren } from "react";

type Props = ComponentProps<"select"> & {
  containerStyle?: CSSProperties;
};

const Select = ({
  children,
  containerStyle = {},
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <div className="Select" style={containerStyle}>
      <select {...props}>{children}</select>
    </div>
  );
};

export default Select;
