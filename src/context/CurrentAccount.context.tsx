import React, { useContext, useEffect } from "react";
import Spinner from "react-spinner-material";

import { CenteredContainer, SpinnerContainer } from "../components/styled/Lib";

import { useAlertContext } from "../components/Alerts";
import { colors } from "../colors";

const CurrentAccountContext = React.createContext<any | undefined>(undefined);

export function useCurrentAccountContext() {
  const context = useContext(CurrentAccountContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentAccountContext must be within CurrentAccountProvider"
    );
  }

  return context;
}

const CurrentAccountContextProvider: React.FC<unknown> = ({ children }) => {
  const { alertRef } = useAlertContext();
  const account = {
    doc: {
      uid: "dummy-uid",
      email: "dummy-email@",
      phoneNumber: "+447777777777",
      fullName: "Dummy",
    },
    view: {
      uid: "dummy-uid",
      email: "dummy-email@",
      phoneNumber: "+447777777777",
      fullName: "Dummy",
    },
  };

  useEffect(() => {
    if (account === null) {
      if (alertRef?.current) {
        alertRef.current.alert("Account Error", "Account does not exist", [
          {
            text: "OK",
            colorVariant: "base",
          },
        ]);
      }
    }
  }, [account]);

  if (account === undefined) {
    return (
      <CenteredContainer>
        <SpinnerContainer>
          <Spinner radius={100} color={colors.secondary} stroke={2} visible />
        </SpinnerContainer>
      </CenteredContainer>
    );
  } else if (account === null) {
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
    <CurrentAccountContext.Provider value={account}>
      {children}
    </CurrentAccountContext.Provider>
  );
};

export default CurrentAccountContextProvider;
