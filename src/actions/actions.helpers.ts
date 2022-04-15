import _ from "lodash";
import { FormStatus } from "../constants/forms.constants";

export const getAreEntriesValid = (formErrors: {
  [archetypeName: string]: { errors: Archetypes.ValidationResult[] };
}): boolean => {
  let result = false;
  if (formErrors) {
    result = Object.values(formErrors).every(
      (archetype) => archetype.errors === null || archetype.errors.length === 0
    );
  } else {
    result = true;
  }

  return result;
};

export function getAreFormsComplete<Acc>(
  data: State.FormState<Acc>,
  errorData: State.ErrorState,
  baseFormName: string
): boolean {
  return Object.keys(errorData)
    .filter(
      (formContext) =>
        formContext !== baseFormName && errorData[formContext].required
    )
    .every((formContext: string) => {
      return !_.isEmpty(_.get(data, formContext));
    });
}

export const getNameIncompleteForm = (
  errorData: State.ErrorState,
  baseFormName: string
): string => {
  return Object.keys(errorData)
    .filter(
      (formContext) =>
        formContext !== baseFormName &&
        errorData[formContext].required &&
        errorData[formContext] !== FormStatus.COMPLETE
    )
    .map((formContext) => {
      const splitContext = formContext.split(".");

      return splitContext[splitContext.length - 1]
        .replace(/([A-Z])/g, " $1")
        .trim();
    })
    .join(", ");
};
