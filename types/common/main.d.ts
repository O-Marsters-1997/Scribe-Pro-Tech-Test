/// <reference path="./state.d.ts" />
/// <reference path="./teams.models.d.ts" />
/// <reference path="./scribepro.models.d.ts" />
/// <reference path="./events.models.d.ts" />
/// <reference path="./firstAid.models.d.ts" />
/// <reference path="./definitions.d.ts" />
/// <reference path="./archetypes.d.ts" />
/// <reference path="../../node_modules/moment" />

type ValueOf<T> = T[keyof T];

declare namespace ScribePro {
  type CSSStyles = { [key: string]: React.CSSProperties };

  type TimestampArchetypeProps<Acc> = {
    path: string;
    title: string;
    validations: any;
    isDisabled: (args: any) => boolean;
    account: Acc;

    subtitle?: string;
    defaultValue?: number;
    disableFuture?: boolean;
    disablePast?: boolean;
  };

  type TimestampArchetypeComponentProps = {
    pips?: boolean;
    onChange: (value: moment.Moment) => void;
    value: null | number;
    title: string;
    isSelected?: boolean;
    disabled?: boolean;

    subtitle?: string;
    defaultValue?: number;
    disableFuture?: boolean;
    disablePast?: boolean;
  };

  type TimestampArchetype<Acc> = React.FC<TimestampArchetypeProps<Acc>>;

  type DateRangeArchetypeComponentProps = {
    pips?: boolean;
    onChange: (value: [moment.Moment, moment.Moment]) => void;
    value: null | number[];
    title: string;
    isSelected?: boolean;
    disabled?: boolean;

    subtitle?: string;
    defaultValue?: number;
    disableFuture?: boolean;
    disablePast?: boolean;
  };

  type WithAccount<Props> = <A extends React.FC<Props>>(
    archetype: A
  ) => (props: Props) => A;

  type PhoneNumber = {
    value: string | undefined | null;
    prefix: string;
    countryCode: string;
  };

  type DateRange = {
    startDate: number | null;
    endDate: number | null;
  };

  type FormStatus =
    | "EMPTY"
    | "COMPLETE"
    | "SHOW_ERRORS"
    | "DOCUMENT_SAVED"
    | "EXIT"
    | "EXIT_NESTED";

  // Optional interface, all worker functions should return Promise.
  interface Workers {
    [key: string]: (options: any) => Promise<any>;
  }

  type TextType = "phoneNumber" | "email" | undefined;

  type ColorVariants =
    | "base"
    | "baseLight"
    | "error"
    | "caution"
    | "success"
    | "secondary"
    | "gradient"
    | "primary"
    | "white"
    | "lightGrey";

  type FontTypes =
    | "large"
    | "mediumPlus"
    | "mediumBold"
    | "mediumRegular"
    | "small"
    | "smallBold"
    | "microBold"
    | "micro";

  type Fonts = {
    [fontType in FontTypes]: {
      size: number;
      weight: "900" | "400" | "600" | "700" | "300";
      fontFamily: string;
    };
  };
}
