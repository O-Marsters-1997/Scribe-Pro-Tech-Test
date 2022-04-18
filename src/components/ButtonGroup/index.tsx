import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";

import View from "../View";

export type ButtonGroupProps = {
  items: Array<Definitions.Item>;
  group: number;
  onChange: (newValue: string | number | null) => void;
  isSelected: (componentValue: string | number | null) => boolean;
  value: unknown;
} & StyleProps;

type StyleProps = {
  layout?: "list-horizontal" | "list-vertical" | "grid";
};

// The group props here works to ensure that each buttongroup has a different group selected
// Each group has a variable number of items in their chunks
// Therefore each buttongroup has as many buttons as there are items in their corresponding chunk

const StyledView = styled(View)<StyleProps>`
  display: flex;
  flex: 0;
  flex-wrap: ${(props) => (props.layout === "grid" ? "wrap" : "nowrap")};
  flex-direction: ${(props) =>
    props.layout === "list-horizontal" ? "row" : "column"};
`;

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  items,
  group,
  isSelected,
  onChange,
  value,
  layout,
}) => {
  console.log(items, isSelected, onChange, value, layout);

  // This map functions maps over the items and produces that number of buttons
  const buttons = items[group].map((item: any) => {
    console.log(item)
    return <Button colorVariant="base" title={item.display}></Button>;
  });

  return (
    <StyledView
      items={items}
      group={group}
      isSelelected={isSelected}
      onChange={onChange}
      value={value}
      layout={layout}
    >
      {buttons}
    </StyledView>
  );
};

export default ButtonGroup;
