import * as React from "react";
import { Button3D, Button3DProps } from "./button-3d";

export interface ButtonProps extends Button3DProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <Button3D ref={ref} {...props} />;
  }
);

Button.displayName = "Button";
