import React from "react";
import styled from "styled-components";

import View from "./View";
import { colors } from "../colors";

const StyledView = styled(View)<{
  appBar?: boolean;
  backgroundColor?: string;
  drawerWidth?: number;
  noPadding?: boolean;
  noScroll?: boolean;
}>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : colors.lightGrey};
  padding: ${({ noPadding }) => (noPadding ? "0px" : "32px")};
  display: flex;
  min-height: calc(100% - 64px);
  flex: 1;
  margin-top: ${({ appBar }) => (appBar ? "64px" : "0px")};
  overflow-y: ${({ noScroll }) => (noScroll ? "hidden" : "scroll")};
  overflow-x: hidden;
  margin-left: ${({ drawerWidth }) =>
    drawerWidth ? `${drawerWidth}px` : "0px"};
  @media (max-width: 600px) {
    margin-top: ${({ appBar }) => (appBar ? "56px" : "0px")};
    margin-left: 0px;
  }
`;

const SafeAreaView: React.FC<{
  noPadding?: boolean;
  appBar?: boolean;
  backgroundColor?: string;
  drawerWidth?: number;
  noScroll?: boolean;
  style?: any;
}> = ({
  children,
  appBar,
  drawerWidth,
  noPadding,
  noScroll = true,
  backgroundColor,
  style,
}) => {
  return (
    <StyledView
      style={{ ...style }}
      backgroundColor={backgroundColor}
      drawerWidth={drawerWidth}
      appBar={appBar}
      noPadding={noPadding}
      noScroll={noScroll}
    >
      {children}
    </StyledView>
  );
};

export default SafeAreaView;
