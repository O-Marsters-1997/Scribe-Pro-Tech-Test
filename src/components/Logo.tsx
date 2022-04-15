import React from "react";

//@ts-ignore]
import logPng from "../assets/logo@3x.png";

type ILogoProps = {
  src?: any;
  scale?: number;
};

const Logo: React.FC<ILogoProps> = ({ src, scale }: ILogoProps) => {
  return (
    <img
      style={{
        ...styles.image,
        ...(scale ? { width: 381 * scale, height: 476 * scale } : undefined),
      }}
      src={src}
      alt="Logo"
    />
  );
};

const styles = {
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 381,
    height: 476,
  },
};

Logo.defaultProps = {
  src: logPng,
};

export default Logo;
