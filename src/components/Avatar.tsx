import React, { useState } from "react";
import styled from "styled-components";

import View from "../components/View";
import "../fontello/css/fontello.css";
// @ts-ignore
import placeHolderImage from "../assets/avatar.png";

export enum Size {
  "xlarge" = "xlarge",
  "large" = "large",
  "medium" = "medium",
  "small" = "small",
  "micro" = "micro",
}

type Props = {
  size?: Size;
  source: any;
};

const getAvatarSize = ({ size }: { size?: Size }) => {
  switch (size) {
    case "xlarge": {
      return "200px";
    }
    case "large": {
      return "150px";
    }
    case "medium": {
      return "50px";
    }
    case "small": {
      return "30px";
    }
    default: {
      return "30px";
    }
  }
};

const ImgContainer = styled(View)<{
  size?: Size;
}>`
  border-radius: ${getAvatarSize};
  width: ${getAvatarSize};
  height: ${getAvatarSize};
  align-self: center;
  display: inline-flex;
`;

const Img = styled.img<{ size?: Size }>`
  border-radius: ${getAvatarSize};
  width: ${getAvatarSize};
  height: ${getAvatarSize};
  object-fit: cover;
`;

const Avatar: React.FC<Props> = ({ source, size }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError && source?.uri) {
    return (
      <ImgContainer size={size}>
        <Img
          size={size}
          alt="avatar"
          src={source.uri.default ? source.uri.default : source.uri}
          onError={() => {
            setImgError(true);
          }}
        />
      </ImgContainer>
    );
  }

  return (
    <ImgContainer size={size}>
      <Img size={size} alt="avatar" src={placeHolderImage} />
    </ImgContainer>
  );
};

export default Avatar;
