import _ from "lodash";
import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useLastUpdatedByContext } from "../context/LastUpdatedBy.context";
import { FormContext } from "../context/Form.context";
import { getEntry } from "../selectors";
import ErrorsList from "../components/Errors";
import { FormActions } from "../constants/forms.constants";
import {
  useValidation,
  useFilterItems,
} from "../hooks/archetypeCreators.hooks";
import { VisibilityContext } from "../components/ConditionalVisibility";

/**
 * @definition {string}: object containing items that will be used as buttons
 * @returns: toggle archetype
 */

export function createToggle<Acc, P extends object>({
  definition,
}: {
  definition: Definitions.Toggle;
}) {
  /**
   * @Component react component
   * @returns ToggleArchetype
   */
  return function WrappedInput(
    Component: React.FC<Archetypes.ToggleTypes.FCInput<Acc> & P>
  ) {
    return function ToggleArchetype({
      path,
      validations,
      layout,
      filterItems,
      isDisabled,
      svgData,
      ...other
    }: Archetypes.ToggleTypes.Props<Teams.AccountView, P>) {
      const lastUpdatedBy = useLastUpdatedByContext();
      const dispatch = useDispatch();
      const { isVisible } = useContext(VisibilityContext);
      const formContext = useContext(FormContext);
      const items = useFilterItems(definition.items, filterItems);
      const [disabled, setDisabled] = useState(false);

      const entryState = useSelector((state: State.AppState<Acc>) => {
        const formErrors = state.errors[formContext]?.archetypes;

        return {
          value: getEntry(state.form, `${formContext}.${path}.value`),
          errors: formErrors ? formErrors[path]?.errors : [],
          contextState: _.get(state.form, formContext) ?? {},
        };
      }, shallowEqual);

      const validationResponses = useValidation({
        value: entryState.value,
        validators: validations,
        disabled,
        path,
      });

      useEffect(() => {
        if (
          items &&
          (entryState.value || typeof entryState.value === "boolean") &&
          _.isEmpty(items.filter((el: any) => el.value === entryState.value))
        ) {
          dispatch({
            payload: {
              path,
              formContext,
            },
            type: FormActions.RESET_ENTRY,
          });
        }
      }, [items, entryState.value]);

      useEffect(() => {
        if (typeof isDisabled === "function") {
          if (disabled !== isDisabled(entryState.contextState)) {
            setDisabled(isDisabled(entryState.contextState));
          }
        }
      }, [entryState.contextState]);

      useEffect(() => {
        if (
          (!isVisible || disabled) &&
          (entryState.value || typeof entryState.value === "boolean")
        ) {
          dispatch({
            payload: {
              path,
              formContext,
            },
            type: FormActions.RESET_ENTRY,
          });
        }
      }, [isVisible, disabled, entryState.value, items]);

      useEffect(() => {
        if (validations && !_.isEqual(validationResponses, entryState.errors)) {
          dispatch({
            type: FormActions.UPDATE_ENTRY_ERRORS,
            payload: {
              path,
              formContext,
              errors: validationResponses,
            },
          });
        }
      }, [validationResponses, entryState.errors]);

      const onChange = (newValue: string | number | null) => {
        let finalValue = newValue;
        if (isValueSelected(newValue)) {
          finalValue = null;
        }

        const newSerialized = {
          created: moment().valueOf(),
          account: lastUpdatedBy,
          value: finalValue,
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

      const isValueSelected = (componentValue: string | number | null) => {
        if (entryState.value !== undefined) {
          return entryState.value === componentValue;
        }

        return false;
      };

      if (!isVisible || !items) {
        return null;
      }

      return (
        <>
          <Component
            {...definition}
            {...(other as P)}
            path={path}
            items={items}
            layout={layout}
            value={entryState.value}
            isSelected={isValueSelected}
            disabled={disabled}
            svgData={svgData}
            onChange={onChange}
          />
          <ErrorsList formContext={formContext} path={path} />
        </>
      );
    };
  };
}
