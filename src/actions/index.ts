import { AnyAction } from "redux";
import _ from "lodash";
import { ThunkAction } from "redux-thunk";

import { FormActions } from "../constants/forms.constants";
import { FormNames } from "../constants/teams.constants";
import {
  getAreEntriesValid,
  getAreFormsComplete,
  getNameIncompleteForm,
} from "./actions.helpers";
import { getTeamView } from "../teams.helpers";

type ThunkResult<R> = ThunkAction<
  R,
  State.AppState<Teams.AccountView>,
  undefined,
  AnyAction
>;

export const createTeam = ({
  account,
}: {
  account: Teams.AccountView;
}): ThunkResult<Promise<void>> => {
  return async (dispatch, getState) => {
    const formName = FormNames.Teams;
    let state = getState();
    state = _.cloneDeep(state);
    const teamData = state.form[formName] ?? {};

    const errorData = state.errors as State.ErrorState;
    const errors = errorData[formName]?.archetypes ?? {};
    const areFormsComplete = getAreFormsComplete(
      state.form,
      errorData,
      formName
    );
    const areEntriesValid = getAreEntriesValid(errors);

    try {
      if (account && areFormsComplete && areEntriesValid) {
        console.log("account saving the data: ", account);
        console.log("data to be saved: ", teamData);
        console.log(
          "view data: ",
          getTeamView({ data: teamData as Teams.TeamData })
        );

        dispatch({
          type: FormActions.DOCUMENT_SAVED,
          payload: {
            formContext: formName,
          },
        });
      } else if (!areFormsComplete) {
        const incompleteForms = getNameIncompleteForm(errorData, formName);
        throw new Error(`Incomplete form/s: ${incompleteForms}`);
      } else if (!areEntriesValid) {
        throw new Error("Validations did not pass");
      }
    } catch (err) {
      console.log(err);

      dispatch({
        type: FormActions.ADD_DOCUMENT_ERROR,
        payload: {
          formContext: formName,
          error: err.message,
        },
      });
    }
  };
};
