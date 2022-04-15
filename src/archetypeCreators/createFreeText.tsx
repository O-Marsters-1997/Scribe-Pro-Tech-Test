import _ from "lodash";
import React, { useEffect, useState, useContext } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { FormContext } from "../context/Form.context";
import { useLastUpdatedByContext } from "../context/LastUpdatedBy.context";
import { getEntry } from "../selectors";
import ErrorsList from "../components/Errors";
import { FormActions } from "../constants/forms.constants";
import { useValidation } from "../hooks/archetypeCreators.hooks";
import { VisibilityContext } from "../components/ConditionalVisibility";

// -----------------------------------------------
/**
 * @returns: free text archetype
 */

export function createFreeText<Acc, P extends object>() {
  /**
   * @Component react component
   * @returns FreeTextArchetype
   */

  return function WrappedInput(
    Component: React.FC<Archetypes.FreeTextTypes.FCInput<Acc> & P>
  ) {
    function FreeTextArchetype({
      path,
      isDisabled,
      placeholder,
      validations,
      ...other
    }: Archetypes.FreeTextTypes.Props<Teams.AccountView, P>) {
      const lastUpdatedBy = useLastUpdatedByContext();
      const dispatch = useDispatch();
      const [disabled, setDisabled] = useState(false);
      const { isVisible } = useContext(VisibilityContext);
      const formContext = React.useContext(FormContext);

      const value = useSelector((state: State.AppState<Acc>): string | null => {
        return getEntry(state.form, `${formContext}.${path}.value`);
      }, shallowEqual);

      const contextState = useSelector((state: State.AppState<Acc>) => {
        return _.get(state.form, formContext) ?? {};
      }, shallowEqual);

      const entryErrors = useSelector((state: State.AppState<Acc>) => {
        const formErrors = state.errors[formContext]?.archetypes;
        if (formErrors) {
          return formErrors[path]?.errors;
        }
      }, shallowEqual);

      const validationResponses = useValidation({
        value,
        validators: validations,
        disabled,
        path,
      });

      useEffect(() => {
        if (typeof isDisabled === "function") {
          if (disabled !== isDisabled(contextState)) {
            setDisabled(isDisabled(contextState));
          }
        }
      }, [contextState, disabled]);

      useEffect(() => {
        if ((value && !isVisible) || (disabled && value !== undefined)) {
          dispatch({
            payload: {
              path,
              formContext,
            },
            type: FormActions.RESET_ENTRY,
          });
        }
      }, [isVisible, disabled]);

      useEffect(() => {
        if (validations && !_.isEqual(validationResponses, entryErrors)) {
          dispatch({
            type: FormActions.UPDATE_ENTRY_ERRORS,
            payload: {
              path,
              formContext,
              errors: validationResponses,
            },
          });
        }
      }, [validationResponses, entryErrors]);

      const onChange = (newValue: string) => {
        const newSerialized = {
          created: moment().valueOf(),
          account: lastUpdatedBy,
          value: newValue,
        };

        dispatch({
          payload: {
            path,
            formContext,
            serialized: newSerialized,
          },
          type: FormActions.ADD_ENTRY,
        });
      };

      if (!isVisible) {
        return null;
      }

      return (
        <>
          <Component
            {...(other as P)}
            path={path}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChangeText={onChange}
          />
          <ErrorsList formContext={formContext} path={path} />
        </>
      );
    }

    return FreeTextArchetype;
  };
}
