import React, { useContext } from "react";
import styled from "styled-components";

import View from "./View";
import { VisibilityContext } from "./ConditionalVisibility";

type IViewProps = {
  flexDirection?: "row" | "column";
  children?: JSX.Element[] | JSX.Element | any;
  style?: any;
};

const StyledView = styled(View)`
  flex-direction: column;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 2px;
  margin-right: 2px;
  display: flex;
  min-height: 47px;
  max-width: 540px;
`;

const FormInputContainer: React.FC<IViewProps> = (props) => {
  const { isVisible } = useContext(VisibilityContext);

  if (!isVisible) {
    return null;
  }

  return <StyledView {...props}>{props.children}</StyledView>;
};

export default FormInputContainer;
