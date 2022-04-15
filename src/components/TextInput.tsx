import React, { useState, useEffect } from "react";
import _ from "lodash";
import styled from "styled-components";

import { colors } from "../colors";

export type TextInputProps = {
  value: string | null;
  placeholder?: string;
  onChangeText: (value: string) => void;
  style?: React.CSSProperties;
  type?: React.HTMLInputTypeAttribute;
};

const Input = styled.input`
  position: relative;
  min-height: 38px;
  max-height: 38px;
  color: ${colors.base};
  font-family: "Nunito";
  max-width: 100%;
  min-width: 200px;
  font-size: 16px;
  background-color: ${colors.lightGrey};
  border-radius: 5px 5px 0px 0px;
  border: none;
  border-bottom: 1px solid ${colors.base};

  padding-left: 8px;
  ::placeholder {
    color: ${colors.base};
  }
`;

const TextInput: React.FC<TextInputProps> = ({
  style = {},
  onChangeText,
  value,
  type = "text",
  placeholder,
  ...other
}) => {
  const debounce = _.debounce(onChangeText, 500);
  const [text, setValue] = useState<string | undefined>(value ?? "");

  useEffect(() => {
    if (value === null) {
      setValue("");
    }
  }, [value]);

  useEffect(() => {
    const isRemovingText = value && text === "";
    const isUpdatingText = value === null ? text !== "" : value !== text;

    if (isRemovingText || isUpdatingText) {
      debounce(text as any);
    }

    return debounce.cancel;
  }, [text, debounce, value]);

  const setText = (event: any) => {
    if (event.target.value !== text) {
      setValue(event.target.value);
    }
  };

  return (
    <Input
      {...other}
      type={type}
      className="placeholder"
      placeholder={placeholder}
      style={{ ...style }}
      value={text ?? ""}
      onChange={setText}
    />
  );
};

export default TextInput;
