import React, { useContext } from "react";

import Icon from "./Icon";
import Text from "./Text";
import View from "./View";
import { VisibilityContext } from "./ConditionalVisibility";

type Props = {
  iconName?: string;
  title: string;
  required?: boolean;
  align?: "left" | "right" | "center";
};

const InputLabel: React.FC<Props> = ({ iconName, title, required, align }) => {
  const { isVisible } = useContext(VisibilityContext);

  if (!isVisible) {
    return null;
  }

  if (align === "right") {
    return (
      <View style={styles.rightAlignContainer as React.CSSProperties | any}>
        {required && (
          <Text type="small" style={styles.asterix}>
            *
          </Text>
        )}
        <Text type="small" textTransform="capitalize" style={styles.textStyles}>
          {title}
        </Text>
        {iconName && <Icon name={iconName} size={14} />}
      </View>
    );
  }

  return (
    <View style={styles.container as React.CSSProperties | any}>
      {iconName && <Icon name={iconName} size={14} />}
      <Text type="small" textTransform="capitalize" style={styles.textStyles}>
        {title}
      </Text>
      {required && (
        <Text type="small" style={styles.asterix}>
          *
        </Text>
      )}
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    paddingBottom: 8,
    marginBottom: 0,
  },
  textStyles: {
    marginBottom: 2,
  },
  asterix: {
    marginLeft: 4,
  },
  rightAlignContainer: {
    flexDirection: "row",
    paddingBottom: 8,
    marginBottom: 0,
    alignItems: "flex-end",
    marginLeft: "auto",
  },
};

export default InputLabel;
