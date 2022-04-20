import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";

import View from "../View";

export type ButtonGroupProps = {
  items: Array<Definitions.Item>;
  group: number;
  index: number;
  onChange: (newValue: string | number | null) => void;
  isSelected: (componentValue: string | number | null) => boolean;
  value: unknown;
} & StyleProps;

type StyleProps = {
  layout?: "list-horizontal" | "list-vertical" | "grid";
  display?: "tab" | "row";
};

// The group props here works to ensure that each buttongroup has a different group selected
// Each group has a variable number of items in their chunks
// Therefore each buttongroup has as many buttons as there are items in their corresponding chunk

const StyledView = styled(View)<StyleProps>`
  display: "${(props) => (props.display === "tab" ? "grid" : "flex")}";
  flex: 0;

  /* This has been inserted to create a small gap between the flex buttons */
  gap: 1%;
  flex-wrap: ${(props) => (props.layout === "grid" ? "wrap" : "nowrap")};
  flex-direction: ${(props) =>
    props.layout === "list-horizontal" ? "row" : "column"};
`;

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  items,
  group,
  index,
  isSelected,
  onChange,
  value,
  layout,
  display,
}) => {
  console.log(items[0], isSelected, onChange, value, layout);

  // This map functions maps over the items and produces that number of buttons
  const buttons = items[group].map((item: any) => {
    if (items[group].indexOf(item) == index) {
      return (
        <Button
          isSelected={true}
          colorVariant="base"
          isDisabled={false}
          title={item.display}
          subtitle={item.sub}
          variant="square"
        ></Button>
      );
    } else {
      return (
        <Button
          isSelected={false}
          colorVariant="base"
          isDisabled={false}
          title={item.display}
          subtitle={item.sub}
          variant="square"
        ></Button>
      );
    }
  });

  return (
    <StyledView
      items={items}
      group={group}
      index={index}
      isSelelected={isSelected}
      textColor="blue"
      onChange={onChange}
      value={value}
      layout={layout}
      display={display}
    >
      {buttons}
    </StyledView>
  );
};

export default ButtonGroup;
