import _ from "lodash";
import { useState, useContext, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { FormContext } from "../context/Form.context";
import { VisibilityContext } from "../components/ConditionalVisibility";

export const useFilterItems = <Acc>(
  items: Array<Definitions.Item>,
  filter?: (args: {
    items: Array<Definitions.Item>;
    contextData: any;
  }) => Array<Definitions.Item>
) => {
  const formContext = useContext(FormContext);
  const [filteredItems, setFilteredItems] = useState<Definitions.Item[] | null>(
    null
  );

  const contextState = useSelector((state: State.AppState<Acc>) => {
    return _.get(state.form, formContext) ?? {};
  }, shallowEqual);

  useEffect(() => {
    if (typeof filter === "function") {
      const newItems = filter({
        items,
        contextData: contextState,
      });

      if (!_.isEqual(filteredItems, newItems)) {
        setFilteredItems(newItems);
      }
    } else {
      setFilteredItems(items);
    }
  }, [contextState]);

  if (!filter) {
    return items;
  }

  return filteredItems;
};

export function useValidation<Acc, E>({
  path,
  value,
  validators,
  disabled,
}: {
  path: string;
  value: E;
  disabled: boolean;
  validators?: {
    [key: string]: (value: E) => Archetypes.ValidationResult;
  };
}) {
  const { isVisible } = useContext(VisibilityContext);
  const formContext = useContext(FormContext);
  const [validityResponses, setValidityResponses] = useState<
    Archetypes.ValidationResult[] | []
  >([]);
  const entryErrors = useSelector((state: State.AppState<Acc>) => {
    return _.get(state.errors, `${formContext}.archetypes.${path}.errors`);
  }, shallowEqual);

  useEffect(() => {
    let responses: Archetypes.ValidationResult[] = [];
    if (validators) {
      for (const validator of Object.values(validators)) {
        const response = validator(value);
        responses.push(response);
      }
      responses = _.compact(responses);

      if (!_.isEqual(responses, entryErrors)) {
        setValidityResponses(responses);
      }
    }
  }, [value, entryErrors]);

  if (disabled || !isVisible) {
    return null;
  }

  return validityResponses;
}
