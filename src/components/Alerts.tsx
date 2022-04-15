import React, {
  useReducer,
  useContext,
  useRef,
  useImperativeHandle,
  useState,
} from "react";

import Text from "./Text";
import View from "./View";
import Pressable from "./Pressable";

type AlertProps = {
  message?: string;
};

/* USEREDUCER */
const initialState = {};

function alertReducer(state: typeof initialState, action: any) {
  switch (action.type) {
    case "removeAlert":
      return {};
    case "addAlert":
      return {
        title: action.payload.title,
        message: action.payload.message,
      };
    default:
      return state;
  }
}

const AlertContext = React.createContext<any>({
  state: {},
  dispatch: null,
  alertRef: null,
});

export function useAlertContext() {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error("useAlertContext must be within AlertContextProvider");
  }

  return context;
}

const AlertContextWrapper = (props: any) => {
  const alertRef = useRef();
  const [state, dispatch] = useReducer(alertReducer, initialState);

  return (
    <AlertContext.Provider value={{ state, dispatch, alertRef }}>
      <Alerts ref={alertRef} />
      {props.children}
    </AlertContext.Provider>
  );
};

type AlertButton = {
  text: string;
  colorVariant?: ScribePro.ColorVariants;
  cb?: () => void;
};

const Alerts = React.forwardRef((_props: AlertProps, ref) => {
  const [alert, setAlert] = useState<{
    isVisible: boolean;
    title: string;
    message: string;
    buttons: AlertButton[];
  }>({
    isVisible: false,
    title: "Error",
    message: "",
    buttons: [{ text: "OK" }],
  });

  const { state, dispatch } = useContext(AlertContext);

  useImperativeHandle(ref, () => ({
    alert: (title: string, message: string, buttons: { text: string }[]) => {
      dispatch({
        payload: { message, title },
        type: "addAlert",
      });

      setAlert({
        isVisible: true,
        title,
        message,
        buttons: buttons ?? [{ text: "OK" }],
      });
    },
  }));

  const pressButton = (button: AlertButton) => {
    dispatch({ type: "removeAlert" });

    if (button.cb) {
      button.cb();
    }
  };

  return (
    <>
      {state && state.message && alert.isVisible && (
        <View
          style={{
            zIndex: 98,
            display: "flex",
            position: "absolute",
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.2)",
            height: "100%",
            width: "100%",
          }}
        >
          <View style={styles.container}>
            <Text type="mediumBold">{state.title}</Text>
            {state.message && (
              <View style={{ padding: 10 }}>
                <Text textAlign="center" type="small">
                  {state.message}
                </Text>
              </View>
            )}
            {alert.buttons && (
              <View
                style={{
                  paddingTop: 12,
                  paddingLeft: 5,
                  paddingRight: 5,
                  display: "flex",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderWidth: 2,
                  width: "100%",
                }}
              >
                {alert.buttons?.map((button) => (
                  <Pressable
                    key={button.text}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      flex: 1,
                      paddingLeft: 12,
                      paddingRight: 12,
                    }}
                    onPress={() => pressButton(button)}
                  >
                    <Text
                      pointer
                      colorVariant={button.colorVariant}
                      type="mediumBold"
                    >
                      {button.text}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
});

Alerts.displayName = "Alerts";

const styles: any = {
  container: {
    maxWidth: 300,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gridTemplateColumns: "1fr 30px",
    alignItems: "center",
    height: "auto",
    backgroundColor: "white",
    position: "fixed" as const,
    zIndex: 99,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 8,
    boxShadow: "rgba(0, 0, 0, 0.4) 3px 6px 9px",
  },
};

export default AlertContextWrapper;
