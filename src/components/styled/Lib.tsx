import styled from "styled-components";

import { colors } from "../../colors";
import View from "../View";

export const PageContainer = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  @media (min-width: 500px) {
    max-width: 500px;
  }
`;

export const CenteredContainer = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  @media (min-width: 500px) {
    max-width: 500px;
  }
`;

export const LogoContainer = styled(View)`
  padding-top: 32px;
  padding-bottom: 32px;
  justify-content: center;
`;

export const SpinnerContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: center;
`;

export const AuthTextContainer = styled(View)`
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  padding-bottom: 32px;
  align-self: center;
  text-align: center;
`;

export const AuthInputContainer = styled(View)`
  display: flex;
  flex: 1;
  min-width: 300px;
  padding-top: 32px;
  padding-bottom: 32px;
  flex-direction column;
  align-self: center;
  justify-content: center;
`;

export const AuthBtnsContainer = styled(View)`
  padding-top: 32px;
  padding-bottom: 32px;
  width: 100%;
  align-self: center;
  text-align: center;
`;

export const LogInContainer = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: row;
  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

export const LogInBtnsContainer = styled(View)`
  flex: 1;
  display: flex;
  min-width: 230px;
  margin-top: 16px;
  flex-direction: column;
  align-self: center;
  max-height: 35px;
`;

export const BGImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

export const HeroImageContainer = styled(View)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogInActionsContainer = styled(View)`
  margin-right: 10%;
  margin-left: 10%;
  margin-top: 30%;
  margin-bottom: 30%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
`;

export const WashLogo = styled.img`
  width: 140px;
  height: 34px;
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const PlayersContainer = styled(View)`
  min-width: 360px;
  position: relative;
  display: flex;
  flex: 2;
  flex-direction: column;
  padding: 18px;
  padding-top: 32px;
  padding-bottom: 32px;
  overflow-y: scroll;
  background-color: ${colors.lightGrey};

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${colors.lightGrey};
  }
`;

export const PlayerDocListContainer = styled(View)`
  flex-direction: column;
  background-color: transparent;
  display: flex;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 12px;
`;
