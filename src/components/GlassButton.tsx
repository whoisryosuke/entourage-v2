import { ComponentProps, PropsWithChildren } from "react";

type Props = ComponentProps<"button"> & {};

const GlassButton = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <button {...props}>
      <span className="btn-content">{children}</span>
    </button>
  );
};

export default GlassButton;
