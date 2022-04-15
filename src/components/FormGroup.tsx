import React from "react";
import styled from "styled-components";

import View from "../components/View";

const StyledView = styled(View)`
  justify-content: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
`;

const FormInputGroup: React.FC<Record<string, unknown>> = ({ children }) => {
  return <StyledView>{children}</StyledView>;
};

export default FormInputGroup;
