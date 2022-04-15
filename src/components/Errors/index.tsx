import _ from "lodash";
import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import { FormStatus } from "../../constants/forms.constants";
import View from "../View";
import ErrorItem from "./ErrorItem";

type Props = {
  formContext: string;
  path: string;
};

function ErrorsList<Acc>({ formContext, path }: Props) {
  const showErrors = useSelector((state: State.AppState<Acc>) => {
    return state.formState
      ? state.formState[formContext] === FormStatus.SHOW_ERRORS
      : false;
  }, shallowEqual);

  const entryErrors = useSelector((state: State.AppState<Acc>) => {
    const contextErrors = state.errors[formContext];

    return _.get(
      contextErrors,
      `archetypes.${path}.errors`
    ) as Archetypes.ValidationResult[];
  }, shallowEqual);

  const renderErrorItem = (
    item: Archetypes.ValidationResult,
    index: number
  ) => <ErrorItem error={item.message} key={index} highlight={showErrors} />;

  return (
    <View style={styles.errorsContainer as any}>
      {entryErrors && entryErrors.map(renderErrorItem)}
    </View>
  );
}

const styles = {
  errorsContainer: {
    paddingTop: 4,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: 16,
  },
};

export default ErrorsList;
