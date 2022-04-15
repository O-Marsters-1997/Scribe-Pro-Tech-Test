import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import styled from "styled-components";

import View from "./View";

type FlexDirection = "row" | "column";
type Props = {
  flexDirection?: { maxWidth: number; direction: FlexDirection };
};

const getFlexDirection = ({
  flexDirection,
}: {
  flexDirection: FlexDirection;
}) => flexDirection;

const StyledView = styled(View)`
  justify-content: center;
  align-items: center;
  display: flex;
  flex: 0;
  flex-direction: ${getFlexDirection};
  flex-wrap: wrap;
  align-content: space-between;
`;

const FormInputGroup: React.FC<Props> = ({ children, flexDirection }) => {
  const matches = useMediaQuery(
    flexDirection?.maxWidth
      ? `(max-width:${flexDirection.maxWidth})`
      : "(max-width:900px)"
  );
  let flexDirectionVal: FlexDirection = "row";

  if (matches && flexDirection) {
    flexDirectionVal = flexDirection?.direction;
  }

  return <StyledView flexDirection={flexDirectionVal}>{children}</StyledView>;
};

export default FormInputGroup;
