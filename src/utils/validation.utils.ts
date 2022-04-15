import _ from "lodash";

export const checkValidInputPhoneNumber = (
  phoneNumber: ScribePro.PhoneNumber
): Archetypes.ValidationResult | null => {
  const result = {
    message: "Field is required",
    name: "inputRequired",
  };

  if (
    typeof phoneNumber === "object" &&
    !_.isEmpty(phoneNumber?.value) &&
    !_.isEmpty(phoneNumber?.prefix) &&
    !_.isEmpty(phoneNumber?.countryCode)
  ) {
    return null;
  }

  return result;
};

export const checkValidInput = (
  value: string
): Archetypes.ValidationResult | null => {
  const result = {
    message: "Field is required",
    name: "inputRequired",
  };

  if (typeof value !== "undefined" && value !== null && value !== "") {
    return null;
  }

  return result;
};

export const checkValidEmail = (
  value: string | null
): Archetypes.ValidationResult | null => {
  const result = {
    message: "Email is not valid",
    name: "emailNotValid",
  };

  if (value === null) {
    return result;
  }

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(String(value.trim()).toLowerCase());
  if (isValid) {
    return null;
  }

  return result;
};

export const checkMinLength =
  (minLength: number) =>
  (value: string): Archetypes.ValidationResult | null => {
    const result = {
      message: `Field needs to be at least ${minLength} characters long`,
      name: "minLength",
    };
    if (value?.length >= minLength) {
      return null;
    }

    return result;
  };

export const telephoneCheck = (
  value?: string
): null | Archetypes.ValidationResult => {
  const result = {
    valid: false,
    message: "Phone number is not valid",
    name: "phoneNumberNotValid",
  };
  if (!value) {
    return result;
  }

  const phoneReg = /^(\+)(\s*\d){7,14}$/;

  if (`${value}`.match(phoneReg)) {
    return null;
  }

  return result;
};

export const booleanCheck = (
  value?: boolean
): null | Archetypes.ValidationResult => {
  const result = {
    message: "Field is required",
    name: "booleanRequired",
  };
  if (value !== null && value !== undefined) {
    return null;
  }

  return result;
};
