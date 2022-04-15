import _ from "lodash";
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { FormContext } from "../context/Form.context";
import { useLastUpdatedByContext } from "../context/LastUpdatedBy.context";
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
 * @returns: multiselect archetype
 */

export function createMultiSelect<Acc, P extends object>({
  definition,
}: {
  definition: Definitions.MultiSelect;
}) {
  return function WrappedInput(
    Component: React.FC<Archetypes.MultiSelectTypes.FCInput<Acc> & P>
  ) {
    function MultiSelectArchetype({
      path,
      validations,
      layout,
      numberOfColumns,
      filterItems,
      isDisabled,
      svgData,
      ...other
    }: Archetypes.MultiSelectTypes.Props<Teams.AccountView, P>) {
      const lastUpdatedBy = useLastUpdatedByContext();
      const dispatch = useDispatch();
      const formContext = useContext(FormContext);
      const items = useFilterItems(definition.items, filterItems);
      const [disabled, setDisabled] = useState(false);
      const { isVisible } = useContext(VisibilityContext);

      const values = useSelector((state: State.AppState<Acc>) => {
        return getEntry<Acc, Array<string | number>>(
          state.form,
          `${formContext}.${path}.values`
        );
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
        value: values,
        validators: validations,
        disabled,
        path,
      });

      useEffect(() => {
        if (
          items &&
          values &&
          !values.every((value: string | number) =>
            items.map((item) => item.value).includes(value)
          )
        ) {
          const filteredValues = values.filter(
            (value: string | number) =>
              !items.map((item) => item.value).includes(value)
          );
          const newValues = [...values].filter(
            (value) => !filteredValues.includes(value)
          );

          const newSerialized = {
            created: moment().valueOf(),
            account: lastUpdatedBy,
            values: newValues,
          };

          dispatch({
            payload: {
              path,
              formContext,
              serialized: newSerialized,
            },
            type: FormActions.ADD_ENTRY,
          });
        }
      }, [items, values]);

      useEffect(() => {
        if (typeof isDisabled === "function") {
          if (disabled !== isDisabled(contextState)) {
            setDisabled(isDisabled(contextState));
          }
        }
      }, [contextState]);

      useEffect(() => {
        if ((disabled || !isVisible) && values) {
          dispatch({
            payload: {
              path,
              formContext,
            },
            type: FormActions.RESET_ENTRY,
          });
        }
      }, [disabled, isVisible, items]);

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

      const onChange = (newValue: string | number | null) => {
        let newValues;
        if (values === undefined || values === null) {
          newValues = [newValue];
        } else {
          newValues = [...values];
          if (newValue) {
            if (isValueSelected(newValue)) {
              const index = newValues.indexOf(newValue);
              newValues.splice(index, 1);
            } else {
              newValues.push(newValue);
            }
          }
        }

        const newSerialized = {
          created: moment().valueOf(),
          account: lastUpdatedBy,
          values: newValues,
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
        if (componentValue && values?.includes(componentValue)) {
          return true;
        }

        return false;
      };

      if (!isVisible || !items) {
        return null;
      }

      return (
        <>
          <Component
            {...(other as P)}
            {...definition}
            path={path}
            values={values}
            items={items}
            layout={layout}
            numberOfColumns={numberOfColumns}
            isSelected={isValueSelected}
            disabled={disabled}
            svgData={svgData}
            onChange={onChange}
          />
          <ErrorsList formContext={formContext} path={path} />
        </>
      );
    }

    return MultiSelectArchetype;
  };
}
