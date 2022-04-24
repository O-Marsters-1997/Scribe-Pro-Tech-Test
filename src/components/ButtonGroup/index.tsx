import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";

import View from "../View";

export type ButtonGroupProps = {
  items: Array<Definitions.Item>;
  // Group and index were two props that I added in
  group: number;
  index: number;
  onChange: (newValue: string | number | null) => void;
  // I believe this on change is important and is used to effect the value prop but I was not able to piece this together entirely to know how to write this.
  isSelected: (componentValue: string | number | null) => boolean;
  value: unknown;
} & StyleProps;

type StyleProps = {
  // This ternary toggles between the single and multi row form layout for buttons
  layout?: "list-horizontal" | "list-vertical" | "grid";
  display?: "tab" | "row";
};

const StyledView = styled(View)<StyleProps>`
  display: flex;
  flex: 0;
  /* This has been inserted to create a small gap between the flex buttons */
  flex-wrap: ${(props) => (props.layout === "grid" ? "wrap" : "nowrap")};

  /* I commented the below rule out as I was finding it challenging to achieve the desired layout with flex-direction column */

  /* flex-direction: ${(props) =>
    props.layout === "list-horizontal" ? "row" : "column"}; */
  & > * {
    /* 28% accounts for margin making it not exactly 33% basis */
    flex: 1 1 28%;
    margin: 0 5px;
  }
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
  // It is clear from this line that these are the relavant props for this project. I believe I have demonstrated an understanding of what `items`, `isSelected` and `layout` are doing.
  // However, I have been unable to really understand what `value` is meant to be used to do.
  // I believe that the method prop `onChange` relates to changing this value prop but because I do not know what it changes it from, I also don't know what is changes it to.
  console.log(items, isSelected, onChange, value, layout);

  // This map functions maps over the items and produces as many buttons as there are items within that group of items.
  // An if statement is then used to check if any of these items indeces match the index prop, the value for which is defined in the team form parent component.
  // Because this index prop relates to the index of the arrays where the item is currently selected on the form, this then returns a button that has a property of isSelected to be true for such buttons.
  // Any other button that is returned has a value for isSelected of false.

  const buttons = items[group].map((item: any) => {
    return (
      <Button
        isSelected={items[group].indexOf(item) == index ? true : false}
        colorVariant="base"
        isDisabled={false}
        title={item.display}
        subtitle={item.sub}
        variant="square"
      ></Button>
    );
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
