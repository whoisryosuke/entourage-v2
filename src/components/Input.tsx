import {
  ComponentProps,
  CSSProperties,
  forwardRef,
  PropsWithChildren,
} from "react";

type Props = ComponentProps<"input"> & {
  containerStyle?: CSSProperties;
};

const Input = forwardRef<HTMLInputElement, PropsWithChildren<Props>>(
  ({ children, containerStyle = {}, ...props }, ref) => {
    return (
      <div className="Input" style={containerStyle}>
        <input ref={ref} {...props}>
          {children}
        </input>
      </div>
    );
  }
);

export default Input;
