import React from "react";
import { Button3D, Button3DProps } from "./button-3d";

// Primary CTA button (e.g., "Start a Project", "Contact Us")
export const ButtonPrimary3D = React.forwardRef<HTMLButtonElement, Button3DProps>(
  (props, ref) => (
    <Button3D ref={ref} variant="primary" size="md" magneticEffect={true} {...props} />
  )
);
ButtonPrimary3D.displayName = "ButtonPrimary3D";

// Secondary action button (e.g., "Learn More", "Explore")
export const ButtonSecondary3D = React.forwardRef<HTMLButtonElement, Button3DProps>(
  (props, ref) => (
    <Button3D ref={ref} variant="secondary" size="md" magneticEffect={true} {...props} />
  )
);
ButtonSecondary3D.displayName = "ButtonSecondary3D";

// Outline button (e.g., "View All", "See More")
export const ButtonOutline3D = React.forwardRef<HTMLButtonElement, Button3DProps>(
  (props, ref) => (
    <Button3D ref={ref} variant="outline" size="md" magneticEffect={false} {...props} />
  )
);
ButtonOutline3D.displayName = "ButtonOutline3D";

// Large prominent button (for hero CTAs)
export const ButtonHero3D = React.forwardRef<HTMLButtonElement, Button3DProps>(
  (props, ref) => (
    <Button3D ref={ref} variant="primary" size="lg" magneticEffect={true} {...props} />
  )
);
ButtonHero3D.displayName = "ButtonHero3D";

// Small button (for cards, tags)
export const ButtonSmall3D = React.forwardRef<HTMLButtonElement, Button3DProps>(
  (props, ref) => (
    <Button3D ref={ref} variant="ghost" size="sm" magneticEffect={false} {...props} />
  )
);
ButtonSmall3D.displayName = "ButtonSmall3D";
