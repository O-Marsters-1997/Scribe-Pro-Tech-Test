import _ from "lodash";
import React, { useState, useContext, useEffect, createContext } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { FormContext } from "../context/Form.context";

type Props = {
  condition: (contextState: any) => boolean;
};

export const VisibilityContext = createContext({ isVisible: true });

const ConditionalVisibility: React.FC<Props> = ({ children, condition }) => {
  const formContext = useContext(FormContext);
  const [isVisible, setIsVisible] = useState(true);

  const contextState = useSelector((state: State.AppState<unknown>) => {
    return _.get(state.form, formContext) ?? {};
  }, shallowEqual);

  useEffect(() => {
    if (typeof condition === "function") {
      setIsVisible(condition(contextState));
    }
  }, [contextState]);

  return (
    <VisibilityContext.Provider value={{ isVisible }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export default ConditionalVisibility;
