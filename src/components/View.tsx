import React from "react";
import styled from "styled-components";

import { colors } from "../colors";

const StyledDiv = styled("div")`
  display: flex;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${colors.base};
  }
`;

type IViewProps = {
  className?: string;
  flexDirection?: "row" | "column";
  onPress?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
  divId?: string;
  pip?: boolean;
  borderType?: string;
  hasMessage?: boolean;
  backgroundOpacity?: "solid" | number;
  colorVariant?: ScribePro.ColorVariants | null;
  backgroundColor?: string;
  narrow?: boolean;
  drawerWidth?: number;
  appBar?: boolean;
  noPadding?: boolean;
  web?: boolean;
  noScroll?: boolean;
};

const View: React.FC<IViewProps> = ({
  children,
  onPress,
  style,
  divId,
  pip,
  borderType,
  hasMessage,
  backgroundOpacity,
  colorVariant,
  narrow,
  backgroundColor,
  drawerWidth,
  appBar,
  noPadding,
  noScroll,
  web,
  ...other
}) => {
  return (
    <StyledDiv {...other} style={{ ...style }} onClick={onPress ?? undefined}>
      {children}
    </StyledDiv>
  );
};

export default View;
