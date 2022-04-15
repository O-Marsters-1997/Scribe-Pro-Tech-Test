import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CurrentUserContextProvider from "./context/CurrentUser.context";
import CurrentAccountContextProvider from "./context/CurrentAccount.context";
import SafeAreaView from "./components/SafeAreaView";
import View from "./components/View";

import { colors } from "./colors";
import HomePage from "./pages/Home.page";

import AlertContextWrapper from "./components/Alerts";
import "./style.css";
import store from "./reducers";

const PrivateRouteAccount: React.FC<{ path: string; exact?: boolean }> = ({
  exact,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      exact={exact}
      render={() => (
        <CurrentUserContextProvider>
          <CurrentAccountContextProvider>
            {children}
          </CurrentAccountContextProvider>
        </CurrentUserContextProvider>
      )}
    />
  );
};

const App: React.FC<unknown> = () => {
  return (
    <Provider store={store}>
      <AlertContextWrapper>
        <div id="recaptchaVerifier" />
        <View
          style={{
            height: "calc(100% - 15px)",
            width: "100%",
            paddingBottom: 12,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              display: "flex",
              overflowY: "scroll",
              overflowX: "hidden",
              height: "100%",
              width: "calc(100% - 24px)",
              paddingLeft: 12,
              paddingRight: 12,
            }}
          >
            <Router>
              <Switch>
                <PrivateRouteAccount exact path="/">
                  <SafeAreaView backgroundColor={colors.white}>
                    <HomePage />
                  </SafeAreaView>
                </PrivateRouteAccount>
              </Switch>
            </Router>
          </View>
        </View>
      </AlertContextWrapper>
    </Provider>
  );
};

export default App;
