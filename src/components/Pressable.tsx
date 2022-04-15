import React from "react";

export type Layout = "list-horizontal" | "list-vertical" | "grid";

type Props = {
  isSelected?: boolean;
  item?: any;
  layout?: Layout;
  isFirst?: boolean;
  isLast?: boolean;
  width?: number;
  onPress: (e?: any) => void;
  disabled?: boolean;
  style?: any;
  testID?: string;
};

const Pressable: React.FC<Props> = ({
  children,
  onPress,
  style,
  isFirst,
  isLast,
  isSelected,
  ...other
}) => {
  const onPressPressable = (e: any) => {
    e.stopPropagation();
    onPress();
  };

  return (
    <div
      onClick={onPressPressable}
      {...other}
      style={{
        display: "flex",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Pressable;
