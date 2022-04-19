import React, { useCallback, useEffect } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { PageContainer } from "../components/styled/Lib";

import { FormNames } from "../constants/teams.constants";
import { createTeamForm } from "../forms/Team.form";

import { useCurrentAccountContext } from "../context/CurrentAccount.context";
import { FormContext } from "../context/Form.context";
import LastUpdatedByContext from "../context/LastUpdatedBy.context";
import { FormStatus } from "../constants/forms.constants";

import { FormActions } from "../constants/forms.constants";
import { useAlertContext } from "../components/Alerts";
import View from "../components/View";
import Button from "../components/Button";

import Archetypes from "../archetypes/index";

import { createTeam } from "../actions/index";

const TeamForm = createTeamForm(Archetypes);

const Home: React.FC<Record<string, unknown>> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const account = useCurrentAccountContext();
  const { alertRef } = useAlertContext();

  const formStatus = useSelector((state: State.AppState<Teams.AccountView>) => {
    return state.formState ? state.formState[FormNames.Teams] : {};
  }, shallowEqual);

  const formError = useSelector((state: State.AppState<Teams.AccountView>) => {
    return state?.errors[FormNames.Teams]?.error ?? null;
  });

  useEffect(() => {
    if (formStatus === FormStatus.DOCUMENT_SAVED) {
      // ---- navigate to add player

      dispatch({
        type: FormActions.RESET_FORM,

        payload: {
          formContext: FormNames.Teams,
        },
      });
    }
  }, [formStatus, history]);

  const setError = useCallback(
    (error: Error) => {
      let message = "Unknown error";
      if (error.message) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      if (alertRef?.current) {
        alertRef.current.alert("Form Error", message, [
          {
            text: "OK",
            colorVariant: "base",
          },
        ]);
      }
    },
    [alertRef]
  );

  useEffect(() => {
    if (formError) {
      setError(formError as Error);

      dispatch({
        type: FormActions.REMOVE_DOCUMENT_ERROR,
        payload: {
          formContext: FormNames.Teams,
        },
      });
    }
  }, [formError]);

  const saveTeam = useCallback(async () => {
    try {
      dispatch(
        createTeam({
          account: account.view,
        })
      );
    } catch (error) {
      setError(error);
    }
  }, [account, history]);



  return (
      <LastUpdatedByContext lastUpdatedBy={account.view}>
        <PageContainer>
          <View style={styles.bodyContainer}>
            <FormContext.Provider value={FormNames.Teams}>
              <TeamForm />
              <Button title="Next" colorVariant="base" onPress={saveTeam} />
            </FormContext.Provider>
          </View>
        </PageContainer>
      </LastUpdatedByContext>
  );
};

const styles: any = {
  bodyContainer: {
    padding: "16px",
    flexDirection: "column",
    marginBottom: "32px",
    height: "100%",
    width: "100%",
  },
};

export default Home;
