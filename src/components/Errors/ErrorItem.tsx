import React from "react";
import styled from "styled-components";

import Text from "../../components/Text";
import View from "../../components/View";

type ErrorProps = {
  error: any;
  key: number;
  highlight?: boolean;
};

type StyleProps = {
  highlight?: boolean;
};

const StyledText = styled(Text)<StyleProps>`
  font-size: 8px;
  color: ${(props) => (props.highlight ? "red" : undefined)};
`;

const ErrorItem: React.FC<ErrorProps> = (props) => {
  if (props.error) {
    return (
      <View style={styles.error as any}>
        {props.highlight && (
          <StyledText highlight={props.highlight} type="microBold">
            {props.error}
          </StyledText>
        )}
      </View>
    );
  }

  return null;
};

const styles = {
  error: {
    display: "flex",
    paddingLeft: 4,
    paddingRight: 4,
  },
  errorText: {
    fontSize: 8,
  },
  highlighted: {
    color: "red",
  },
};

export default ErrorItem;
