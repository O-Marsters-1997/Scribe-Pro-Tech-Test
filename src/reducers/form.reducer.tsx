import _ from "lodash";

import { FormActions, FormStatus } from "../constants/forms.constants";

function formReducer<Acc>(
  state: State.FormState<Acc> = {},
  action: State.Actions<Acc>
): State.FormState<Acc> {
  switch (action.type) {
    case FormActions.RESET_FORM: {
      return {};
    }
    case FormActions.ADD_FORM_DATA: {
      const { data, formContext } = action.payload;
      const stateClone = _.cloneDeep(state);

      _.set(stateClone, formContext, data);

      return stateClone;
    }
    case FormActions.ADD_ENTRY: {
      const { formContext, serialized, path } = action.payload;
      const stateClone = _.cloneDeep(state);
      const recordContext = `${formContext}.${path}`;
      _.set(stateClone, recordContext, serialized);

      return stateClone;
    }
    case FormActions.DELETE_ENTRY: {
      const { formContext, index } = action.payload;

      const stateClone = _.cloneDeep(state);
      const formState = _.get(state, formContext);
      formState.splice(index, 1);
      _.set(stateClone, formContext, formState);

      return stateClone;
    }
    case FormActions.RESET_ENTRY: {
      const { formContext, path } = action.payload;
      const stateClone = _.cloneDeep(state);
      const recordContext = `${formContext}.${path}`;
      _.unset(stateClone, recordContext);

      return stateClone;
    }
    case FormActions.CACHE_FORM_DATA: {
      const { formContext } = action.payload;
      const stateClone = _.cloneDeep(state);
      const formDataToCache = _.get(state, formContext);

      if (!_.isEmpty(formDataToCache)) {
        _.set(stateClone, `CACHE.${formContext}`, formDataToCache);
      }

      return stateClone;
    }
    case FormActions.RESTORE_CACHED_FORM_DATA: {
      const { formContext } = action.payload;
      const stateClone = _.cloneDeep(state);
      const cachedForm = _.get(state, `CACHE.${formContext}`);
      const formState = _.get(state, formContext);

      if (formState) {
        _.unset(stateClone, formContext);

        if (cachedForm === undefined) {
          /*
           * When a form is exited without saving the cached value is restored.
           * When this is a new repeater form the cached value is undefined.
           * When form data is unset (above) it leaves a null value in the array (which leads to problems).
           * To remove the null value the following code uses regex to get the form context
           * without the array index and then compacts this to remove the null
           */

          const isDataInContextAnArray = /\[[\d]+\]/.test(formContext);
          if (isDataInContextAnArray) {
            const regExp = /\[([^)]+)\]/;
            const matches = regExp.exec(formContext);

            if (matches) {
              const formContextForArray = formContext.replace(matches[0], "");
              const dataInContext = _.get(stateClone, formContextForArray);
              const cleanedArrayData = _.compact(dataInContext as any);

              _.set(stateClone, formContextForArray, cleanedArrayData);
            }
          }
        }
      }

      if (cachedForm) {
        _.set(stateClone, formContext, cachedForm);
        _.unset(stateClone, `CACHE.${formContext}`);
      }

      return stateClone;
    }
    default:
      return state;
  }
}

export function formStateReducer<Acc>(
  state: State.FormStatusState = {},
  action: State.Actions<Acc>
) {
  switch (action.type) {
    case FormActions.CLEAR_FORM_STATUS:
    case FormActions.RESET_FORM: {
      return {};
    }
    case FormActions.DOCUMENT_SAVED: {
      const { formContext } = action.payload;

      return {
        [formContext]: FormStatus.DOCUMENT_SAVED,
      };
    }
    case FormActions.EXITED_NESTED_FORM: {
      const { formContext } = action.payload;

      return {
        [formContext]: FormStatus.EXIT_NESTED,
      };
    }
    case FormActions.EXITED_FORM: {
      const { formContext } = action.payload;

      return {
        [formContext]: FormStatus.EXIT,
      };
    }
    case FormActions.ADD_DOCUMENT_ERROR: {
      const { formContext } = action.payload;
      const stateClone = _.cloneDeep(state);

      return {
        ...stateClone,
        [formContext]: FormStatus.SHOW_ERRORS,
      };
    }
    default:
      return state;
  }
}

export default formReducer;
