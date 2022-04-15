import React from "react";
import styled from "styled-components";

import View from "./View";

const StyledView = styled(View)`
  display: flex;
  width: 100%;
  flex: 1;
  background-color: #fff;
  padding: 10px;
  flex-direction: column;
`;

const FormContainer: React.FC<unknown> = ({ children }) => {
  return <StyledView>{children}</StyledView>;
};

export default FormContainer;
