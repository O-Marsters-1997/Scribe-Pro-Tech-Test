import React from "react";
import WebFont from "webfontloader";
import styled from "styled-components";

import { colors } from "../colors";
import { fontsWeb } from "../font";

WebFont.load({
  google: {
    families: ["Nunito:wght@300;400;700", "sans-serif"],
  },
});

type StyleProps = {
  noWrap?: boolean;
  isSelected?: boolean;
  type?: ScribePro.FontTypes;
  textType?: ScribePro.TextType;
  colorVariant?: ScribePro.ColorVariants | null;
  textAlign?: "center" | "left" | "right";
  children: string | string[] | any;
  pip?: boolean;
  ellipsis?: boolean;
  ellipsizeMode?: string;
  numberOfLines?: number;
  pointer?: boolean;
};

type ITextProps = {
  onPress?: any;
  textTransform?: "none" | "capitalize" | "uppercase";
  style?: any;
} & StyleProps;

const getTextColor = ({ isSelected, colorVariant }: StyleProps) => {
  if (isSelected) {
    return colors.white;
  } else if (colorVariant) {
    return colors[colorVariant];
  }

  return colors.base;
};

const getFontWeight = ({ type }: StyleProps) =>
  type ? fontsWeb[type].weight : "400";
const getFontSize = ({ type }: StyleProps) =>
  type ? `${fontsWeb[type].size}px` : "10px";

const StyledText = styled("span")<StyleProps>`
  font-weight: ${getFontWeight};
  font-family: "nunito";
  color: ${getTextColor};
  font-size: ${getFontSize};
  text-align: ${(props) => props.textAlign};
  max-width: ${(props) => (props.ellipsis ? "150px" : "initial")};
  white-space: ${(props) => (props.ellipsis ? "initial" : "initial")};
  overflow: ${(props) => (props.ellipsis ? "hidden" : "initial")};
  text-overflow: ${(props) => (props.ellipsis ? "ellipsis" : "initial")};
  cursor: ${(props) =>
    props.onClick || props.pointer ? "pointer" : "initial"};
`;

const Text: React.FC<ITextProps> = ({
  children,
  style,
  textTransform,
  pip,
  onPress,
  ...other
}) => {
  return (
    <StyledText {...other} style={style} onClick={onPress ? onPress : null}>
      {textTransform === "uppercase"
        ? String(children).toUpperCase()
        : children}
    </StyledText>
  );
};

Text.defaultProps = {
  colorVariant: "base",
  type: "mediumRegular",
  textAlign: "left",
};

export default Text;
