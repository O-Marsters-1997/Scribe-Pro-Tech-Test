import React from "react";
import styled from "styled-components";
import Button from "../Button";

import View from "../View";

export type ButtonGroupProps = {
  items: Array<Definitions.Item>;
  onChange: (newValue: string | number | null) => void;
  isSelected: (componentValue: string | number | null) => boolean;
  value: unknown;
} & StyleProps;

type StyleProps = {
  layout?: "list-horizontal" | "list-vertical" | "grid";
};

const StyledView = styled(View)<StyleProps>`
  display: flex;
  flex: 0;
  flex-wrap: ${(props) => (props.layout === "grid" ? "wrap" : "nowrap")};
  flex-direction: ${(props) =>
    props.layout === "list-horizontal" ? "row" : "column"};
`;

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  items,
  isSelected,
  onChange,
  value,
}) => {
  console.log(items, isSelected, onChange, value);

  return (
    <StyledView layout="list-horizontal">
      <p>fgusdfhbg</p>
      <p>fgusdfhbg</p>
      
    </StyledView>
  );
};

export default ButtonGroup;
