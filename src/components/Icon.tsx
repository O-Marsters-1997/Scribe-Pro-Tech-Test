import React from "react";

import "../fontello/css/fontello.css";
import { colors } from "../colors";

type IIconProps = {
  name: string;
  color?: string;
  size?: number;
  marginRight?: number;
  marginLeft?: number;
  style?: any;
  isLoading?: boolean;
  colorVariant?: ScribePro.ColorVariants;
};

const Icon: React.FC<IIconProps> = ({
  colorVariant,
  marginLeft = 0,
  marginRight = 0,
  size = 24,
  isLoading,
  name,
  style,
}) => {
  const getVariantColor = () => {
    return colorVariant ? colors[colorVariant] : colors.base;
  };

  if (isLoading) {
    return null;
  }

  return (
    <i
      className={`icon-${name}`}
      style={{
        fontSize: size,
        color: getVariantColor(),
        marginLeft,
        marginRight,
        ...style,
      }}
    />
  );
};

export default Icon;
