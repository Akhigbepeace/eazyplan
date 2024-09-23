import clsx from "clsx";
import React, { ReactNode } from "react";

const typographyVariants = {
  h1: "text-[28px]",
  h2: "text-[24px]",
  h3: "text-[20px]",
  h4: "text-[16px]",
  p: "text-[18px]",
};

const textWeights = {
  extraBold: "font-[800]",
  bold: "font-[600]",
  regular: "font-[500]",
  light: "font-[400]",
};

const textColorVariants = {
  white: "text-[#FFF]",
  black: "text-[#000]",
};

const fontVariants = {
  montserrat: "font-montserrat",
  lato: "font-lato",
};

const opacityVariants = {
  md: "opacity-50",
  lg: "opacity-60",
  xl: "opacity-70",
  none: "opacity-100",
};

type TypographyVariants = keyof typeof typographyVariants;
type TextColorVariants = keyof typeof textColorVariants;
type TextFamily = keyof typeof fontVariants;
type Opacity = keyof typeof opacityVariants;
type TextWeights = keyof typeof textWeights;

type TypographyProps = {
  opacity?: Opacity;
  family: TextFamily;
  variant: TypographyVariants;
  weight: TextWeights;
  children: string | number | ReactNode;
  color: TextColorVariants;
  htmlTag?: TypographyVariants | "span" | "div";
  spacing?: string;
};

const Typography = (props: TypographyProps) => {
  const {
    children,
    variant,
    htmlTag,
    spacing,
    weight,
    family,
    opacity = "none",
    color,
  } = props;
  const Component = htmlTag || variant;
  const typographyClx = typographyVariants[variant];
  const textColorClx = textColorVariants[color];
  const fontFamily = fontVariants[family];
  const fontWeight = textWeights[weight];
  const textOpacity = opacity && opacityVariants[opacity];

  return (
    <Component
      className={clsx(
        typographyClx,
        textColorClx,
        spacing,
        fontFamily,
        fontWeight,
        textOpacity
      )}
    >
      {children}
    </Component>
  );
};

export default Typography;
