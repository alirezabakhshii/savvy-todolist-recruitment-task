import React, { ElementType, createElement, ReactNode } from "react";

export type TextProps = {
  elementType: ElementType;
  children?: string | ReactNode;
  className?: string;
};

export const Text: React.FC<TextProps> = (props) => {
  const { elementType, children, className } = props;

  return createElement(
    elementType,
    {
      className: `${className ? className : ""}`,
    },
    children,
  );
};
