import _ from "lodash";

import { FormActions } from "../constants/forms.constants";

function errorsReducer<Acc>(
  state: State.ErrorState = {},
  action: State.Actions<Acc>
): State.ErrorState {
  switch (action.type) {
    case FormActions.UPDATE_ENTRY_ERRORS: {
      const { formContext, path, errors } = action.payload;
      const formContextArchetypes = state[formContext]?.archetypes ?? {};

      return {
        ...state,
        [formContext]: {
          ...state[formContext],
          error: null,
          archetypes: {
            ...formContextArchetypes,
            [path]: {
              ...formContextArchetypes[path],
              errors,
            },
          },
        },
      };
    }
    case FormActions.SET_REQUIRED_NESTED: {
      const { formContext } = action.payload;
      const stateClone = _.cloneDeep(state);

      return {
        ...stateClone,
        [formContext]: {
          ...stateClone[formContext],
          required: true,
        },
      };
    }
    case FormActions.ADD_DOCUMENT_ERROR: {
      const { formContext, error } = action.payload;
      const stateClone = _.cloneDeep(state);

      return {
        ...stateClone,
        [formContext]: {
          ...stateClone[formContext],
          error,
        },
      };
    }
    case FormActions.REMOVE_DOCUMENT_ERROR: {
      const { formContext } = action.payload;
      const stateClone = _.cloneDeep(state);

      return {
        ...stateClone,
        [formContext]: {
          ...stateClone[formContext],
          error: null,
        },
      };
    }
    case FormActions.RESET_FORM: {
      const { formContext } = action.payload;
      const stateClone = _.cloneDeep(state);

      const nestedFormsNames = Object.keys(stateClone).filter((formName) =>
        formName.includes(formContext)
      );

      for (const formName of nestedFormsNames) {
        _.unset(stateClone, formName);
      }

      return stateClone;
    }
    case FormActions.RESTORE_CACHED_FORM_DATA: {
      const { formContext } = action.payload;
      const stateClone = _.cloneDeep(state);
      delete stateClone[formContext];

      return stateClone;
    }
    default:
      return state;
  }
}

export default errorsReducer;
