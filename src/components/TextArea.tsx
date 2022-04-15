import React, { useState, useEffect } from "react";
import _ from "lodash";

import { colors } from "../colors";

export type TextAreaProps = {
  value: string | null;
  placeholder?: string;
  rows?: number;
  cols?: number;
  onChangeText: (value?: any) => void;
};

const TextArea = ({
  value,
  rows,
  placeholder,
  cols,
  onChangeText,
}: TextAreaProps) => {
  const debounce = _.debounce(onChangeText, 500);
  const [text, setValue] = useState(value ?? "");

  useEffect(() => {
    const isRemovingText = value && text === "";
    const isUpdatingText = text !== value && value !== null;

    if (isRemovingText || isUpdatingText) {
      debounce(text as any);
    }

    return debounce.cancel;
  }, [text]);

  const setText = (event: any) => {
    if (event.target.value !== text) {
      setValue(event.target.value);
    }
  };

  return (
    <textarea
      className="placeholder-textarea"
      placeholder={placeholder}
      style={styles.textArea}
      value={text ?? ""}
      rows={rows || 1}
      cols={cols || undefined}
      // @ts-ignore
      onChange={setText}
    />
  );
};

const styles = {
  textArea: {
    minHeight: 100,
    fontSize: "12px",
    fontFamily: " Nunito",
    fontWeight: 400,
    backgroundColor: colors.lightGrey,
    border: "none",
    cursor: "pointer",
    color: colors.base,
    outlineColor: colors.base,
    padding: 10,
    borderBottom: `solid 1px ${colors.base}`,
  },
};

export default TextArea;
