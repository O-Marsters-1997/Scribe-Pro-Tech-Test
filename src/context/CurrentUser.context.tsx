import React, { useContext, useCallback } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import Spinner from "react-spinner-material";

import { CenteredContainer, SpinnerContainer } from "../components/styled/Lib";
import { colors } from "../colors";

const CurrentUserContext = React.createContext<
  { uid: string; email: string; phoneNumber: string } | undefined
>(undefined);

export function useCurrentUserContext() {
  const context = useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error("useCurrentUserContext must be within CurrentUserProvider");
  }

  return context;
}

const CurrentUserContextProvider: React.FC<unknown> = ({ children }) => {
  const { number, notificationId, from, email } = queryString.parse(
    location.search
  );
  const currentUser = {
    uid: "dummy-uid",
    email: "dummy-email@",
    phoneNumber: "+447777777777",
  };
  const history = useHistory();

  const redirectBasedOnUrlQuery = useCallback(async () => {
    if (from === "sms" && number && notificationId) {
      history.push(
        `/sms-auth?notificationId=${notificationId}&number=${number}`
      );
    } else if (from === "email" && email && notificationId) {
      history.push(
        `/email-link-auth?notificationId=${notificationId}&email=${email}`
      );
    } else {
      history.push("/");
    }
  }, [history, location, number, notificationId, from, email]);

  if (currentUser === undefined) {
    return (
      <CenteredContainer>
        <SpinnerContainer>
          <Spinner radius={100} color={colors.secondary} stroke={2} visible />
        </SpinnerContainer>
      </CenteredContainer>
    );
  } else if (currentUser === null) {
    // sign-out

    return (
      <CenteredContainer>
        <SpinnerContainer>
          <Spinner radius={100} color={colors.secondary} stroke={2} visible />
        </SpinnerContainer>
      </CenteredContainer>
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
