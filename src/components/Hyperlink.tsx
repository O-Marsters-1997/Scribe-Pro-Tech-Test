import React from "react";

type Props = {
  url: string;
  text: string;
  style?: any;
};

const Hyperlink: React.FC<Props> = (props) => {
  const { url, text } = props;

  return (
    <div style={styles.row}>
      <a href={url}>{text}</a>
    </div>
  );
};

const styles: any = {
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
};

export default Hyperlink;
