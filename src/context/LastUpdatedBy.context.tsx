import React, { useContext } from "react";
import { once } from "lodash";

export const createLastUpdatedByContext = once(<A,>() =>
  React.createContext<undefined | A>(undefined)
);

export function useLastUpdatedByContext<A>() {
  const LastUpdatedByContext = createLastUpdatedByContext<A>();
  const context = useContext(LastUpdatedByContext);

  if (context === undefined) {
    throw new Error(
      "useLastUpdatedByContext must be within LastUpdatedByContext"
    );
  }

  return context;
}

type Props<Acc> = {
  children: React.ReactNode;
  lastUpdatedBy: Acc;
};

export default function LastUpdatedByContext<Acc>({
  lastUpdatedBy,
  children,
}: Props<Acc>): JSX.Element {
  const LastUpdatedByContext = createLastUpdatedByContext<Acc>();

  return (
    <LastUpdatedByContext.Provider value={lastUpdatedBy}>
      {children}
    </LastUpdatedByContext.Provider>
  );
}
