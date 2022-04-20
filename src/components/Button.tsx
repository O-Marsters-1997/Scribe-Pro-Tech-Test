import React from "react";
import Spinner from "react-spinner-material";
import styled from "styled-components";

import Icon from "../components/Icon";
import { colors } from "../colors";

import Text from "./Text";

type Props = {
  title: string;
  subtitle?: string;
  onPress: () => void;
  style?: ScribePro.CSSStyles;
  isLoading?: boolean;
  textType?: ScribePro.FontTypes;
  rightIconName?: string;
  textColor?: ScribePro.ColorVariants;
} & StyleProps;

type StyleProps = {
  variant?: "full" | "outline" | "square";
  widthVariant?: "small" | undefined;
  isSelected?: boolean;
  isDisabled?: boolean;
  colorVariant?: ScribePro.ColorVariants;
  square?: boolean;
};

const defaultProps: any = {
  variant: "full",
  colorVariant: "primary",
};

const getBackgroundColor = ({
  isSelected,
  variant,
  colorVariant,
}: StyleProps) => {
  if (isSelected) {
    return colors.base;
  }
  if (variant === "outline" || variant === "square") {
    return "#f8f8f8";
  }

  return colors[colorVariant ?? "primary"];
};

const StyledButton = styled.button<StyleProps>`
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
  elevation: 1;
  shadow-opacity: 0.4;
  shadow-radius: 3px;
  display: flex;
  flex: 1;
  border: ${({ variant }) => (variant === "outline" ? "solid" : "none")};
  min-height: 38px;
  max-height: 48px;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: ${({ variant }) => (variant === "square" ? "5px" : "20px")};
  padding: 12px;
  border-width: 1px;
  border-color: ${({ colorVariant }) => colors[colorVariant ?? "primary"]};
  background-color: ${getBackgroundColor};
  opacity: ${(props: StyleProps) => (props.isDisabled ? 0.5 : 1)};
`;

const Button: React.FC<Props> = ({
  isDisabled,
  isLoading,
  onPress,
  title,
  subtitle,
  variant = "full",
  colorVariant = "primary",
  textColor,
  isSelected,
  textType,
  rightIconName,
}) => {
  const getColorVariantText = () => {
    if (isDisabled) {
      return "lightGrey";
    }
    if (textColor) {
      return textColor;
    }

    switch (variant) {
      case "square": {
        return colorVariant;
      }
      case "full": {
        return "white";
      }
      default: {
        return "white";
      }
    }
  };

  return (
    <StyledButton
      disabled={isDisabled === true || isLoading}
      isDisabled={isDisabled}
      isSelected={isSelected}
      variant={variant}
      colorVariant={colorVariant}
      onClick={onPress}
    >
      {isLoading ? (
        <Spinner radius={16} color="#fff" stroke={2} visible />
      ) : (
        <>
          <Text
            noWrap
            type={textType ? textType : "mediumBold"}
            isSelected={isSelected}
            colorVariant={getColorVariantText()}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              isSelected={isSelected}
              colorVariant={getColorVariantText()}
              type="small"
            >
              {subtitle}
            </Text>
          )}
          {rightIconName && (
            <Icon
              colorVariant="white"
              name={rightIconName}
              size={20}
              marginLeft={12}
            />
          )}
        </>
      )}
    </StyledButton>
  );
};

Button.defaultProps = defaultProps;

export default Button;
