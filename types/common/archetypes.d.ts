/// <reference path="./state.d.ts" />
/// <reference path="./teams.models.d.ts" />
/// <reference path="./definitions.d.ts" />
/// <reference path="./main.d.ts" />

declare namespace Archetypes {
  declare namespace MultiSelectTypes {
    type InjectedProps = {
      items: Definitions.Item[];
      values: Array<string | number> | null;
      isSelected: (componentValue: string | number | null) => boolean;
      onChange: (newValue: string | number | null) => void;
      disabled?: boolean;
    };

    type ArchetypeProps<Acc> = {
      validations?: any;
      isDisabled?: (contextState: State.Form<Acc>) => boolean;
      path: string;
      layout?: "list-horizontal" | "list-vertical" | "grid";
      numberOfColumns?: number | undefined;
      filterItems?: (args: {
        items: Array<Definitions.Item>;
        contextData: any;
      }) => Array<Definitions.Item>;
      isSelected: (componentValue: string | number | null) => boolean;
      svgData?: any;
      isSportTypeLocked?: any;
    };

    type PropsKeysToOmit =
      | "validations"
      | "isDisabled"
      | "filterItems"
      | "isSelected";

    type FinalProps<P, Acc> = {
      items: Definitions.Item[];
      layout?: "list-horizontal" | "list-vertical" | "grid";
      numberOfColumns: number | undefined;
      values: Array<string | number> | null;
      isSelected: (componentValue: string | number | null) => boolean;
      disabled?: boolean;
      svgData?: any;
      onChange: (newValue: string | number | null) => void;
    };

    type FCInput<Acc> = Omit<ArchetypeProps<Acc>, PropsKeysToOmit> &
      InjectedProps;

    type Props<Acc, P extends object> = Omit<
      ArchetypeProps<Acc> & P,
      keyof InjectedProps
    >;
  }

  declare namespace FreeTextTypes {
    type InjectedProps = {
      value: unknown;
      onChangeText: (newValue: string) => void;
      disabled?: boolean;
    };

    type ArchetypeProps<Acc> = {
      validations?: any;
      isDisabled?: (contextState: State.Form<Acc>) => boolean;
      path: string;
      placeholder?: string;
    };

    type PropsKeysToOmit = "placeholder" | "isDisabled" | "validations";

    type FinalProps<P, Acc> = {
      path: string;
      value: string | null;
      disabled: boolean;
      placeholder?: string | undefined;
      onChangeText: (newValue: string) => void;
    };

    type FCInput<Acc> = Omit<ArchetypeProps<Acc>, PropsKeysToOmit> &
      InjectedProps;

    type Props<Acc, P extends object> = Omit<
      ArchetypeProps<Acc> & P,
      keyof InjectedProps
    >;
  }

  declare namespace ToggleTypes {
    type InjectedProps = {
      items: Definitions.Item[];
      value: unknown;
      isSelected: (componentValue: string | number | null) => boolean;
      onChange: (newValue: string | number | null) => void;
      disabled?: boolean;
    };

    type ArchetypeProps<Acc> = {
      validations?: any;
      isDisabled?: (contextState: State.Form<Acc>) => boolean;
      path: string;
      layout?: "list-horizontal" | "list-vertical" | "grid";
      numberOfColumns?: number | undefined;
      filterItems?: (args: {
        items: Array<Definitions.Item>;
        contextData: any;
      }) => Array<Definitions.Item>;
      isSelected: (componentValue: string | number | null) => boolean;
      svgData?: any;
      isSportTypeLocked?: any;
    };

    type PropsKeysToOmit =
      | "validations"
      | "isDisabled"
      | "filterItems"
      | "isSelected";

    type FinalProps<P, Acc> = {
      items: Definitions.Item[];
      layout: (P & ArchetypeProps<Acc>)["layout"] | undefined;
      isSelected: (componentValue: string | number | null) => boolean;
      disabled?: boolean;
      svgData: (P & ArchetypeProps<Acc>)["svgData"] | undefined;
    };

    type FCInput<Acc> = Omit<ArchetypeProps<Acc>, PropsKeysToOmit> &
      InjectedProps;

    type Props<Acc, P extends object> = Omit<
      ArchetypeProps<Acc> & P,
      keyof InjectedProps
    >;
  }

  type ValidationResult = {
    message: string;
    name: string;
  };

  type Entry<A> =
    | Image<A>
    | Images<A>
    | Signature<A>
    | MultiSelect<A>
    | Body<A>
    | FreeText<A>
    | SVGMultiSelect<A>
    | PhoneNumber<A>
    | FreeTextNumber<A>
    | DateArchetype<A>
    | Duration<A>
    | Minutes<A>;

  type EntryOld =
    | ToggleOld
    | TimeOld
    | SignatureOld
    | DateOld
    | BodyOld
    | BooleanOld
    | DurationOld
    | FreeTextOld
    | ImageOld
    | MinutesOld
    | PhoneNumberOld
    | MultiSelectOld
    | NumberOld
    | PainScoreOld
    | ImagesOld;

  //---------------------------------

  type entryTogglePayload<A> = {
    created: number;
    account: A;
    value: string | number | null;
  };

  type entryToggle<A> = (
    entry: entryTogglePayload<A>
  ) => Toggle<A> | PainScore<A> | BooleanToggle<A>;

  type Toggle<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    value: string | number | null;
  };

  type PainScore<A> = {
    score: number;
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
  };

  type BooleanToggle<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    bool: boolean;
  };

  // Old entry
  type ToggleOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    value: number | string;
  };

  type BooleanOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    bool: boolean;
  };

  type PainScoreOld = {
    score: number;
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
  };

  //---------------------------------
  //
  type EntryFomatterAgs<Acc> = {
    created: number;
    account: Acc;
    value: number;
  };

  type CustomEntry<Acc> = {
    account: Acc;
    created: number;

    [key: string]: string | number | undefined | Date | Acc;
  };

  type FormatEntryTimestamp = <Acc>(args: {
    created: number;
    account: Acc;
    value: number;
  }) => Timestamp<Acc> | Time<Acc> | DateArchetype<Acc> | CustomEntry<Acc>;

  type FormatEntryDateRange = <A>(entry: {
    created: number;
    account: A;
    startValue: Date;
    endValue: Date;
  }) => DateRangeArchetype<A>;

  type Timestamp<A> = {
    timestamp: number;
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
  };

  type DateRangeArchetype<A> = {
    range: { startDate: Date; endDate: Date };
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
  };

  type Time<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    time: number;
  };

  type DateArchetype<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    date: number;
  };

  // Old entry
  type TimeOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    time: number;
  };

  type DateOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    date: number;
  };

  //---------------------------------

  type entryMultiselect = <A>(entry: {
    created: number;
    account: A;
    values: number[] | string[];
  }) => MultiSelect<A>;

  type MultiSelect<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    values: Array<number | string>;
  };

  //---------------------------------
  type GCSValue = {
    total: number;
    eye: number | null;
    verbal: number | null;
    motor: number | null;
  };

  type entryGcs = <A>(entry: {
    created: number;
    account: A;
    values: GCSValue;
  }) => GCS<A>;

  type GCS<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    values: GCSValue;
  };

  // Old entry

  type MultiSelectOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    values: number[] | string[];
  };

  //---------------------------------

  type entrySVGMultiselectPayload<A> = {
    created: number;
    account: A;
    values: string[] | { back: string[]; front: string[] };
  };
  type entrySVGMultiselect = <A>(
    entry: entrySVGMultiselectPayload<A>
  ) => Body<A> | SVGMultiSelect<A>;

  type SVGMultiSelect<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    values: string[];
  };

  type Body<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    sites: { back: string[]; front: string[] };
  };

  // Old entry

  type BodyOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    sites: { back: string[]; front: string[] };
  };

  //---------------------------------

  type entryPhoneNumber = <A>(entry: {
    created: number;
    account: A;
    value: {
      value: string;
      prefix: string;
      countryCode: string;
    };
  }) => PhoneNumber<A>;

  type PhoneNumber<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    phoneNumber: {
      value: string;
      prefix: string;
      countryCode: string;
    };
  };

  // Old Serialize

  type PhoneNumberOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    phoneNumber: string;
  };

  //---------------------------------

  type SerializeNumberPayload<A> = {
    created: number;
    account: A;
    value: string;
  };
  type entryNumber = <A>(
    entry: SerializeNumberPayload<A>
  ) => FreeTextNumber<A> | Duration<A> | Minutes<A>;

  type FreeTextNumber<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    number: string;
  };

  type Duration<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    duration: string;
  };

  type Minutes<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    minutes: string;
  };

  // Old entry

  type DurationOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    duration: string;
  };

  type MinutesOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    minutes: string;
  };

  type NumberOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    number: string;
  };

  //---------------------------------

  type entryImagePayload<A> = {
    created: number;
    account: A;
    value: { uri: string };
  };

  type entryImage = <A>(
    entry: entryImagePayload<A>
  ) => Image<A> | Images<A> | Signature<A>;

  type Image<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    image: {
      uri: string;
      uploaded?: boolean;
    };
  };

  type Images<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    images: FileUri[] | ScribePro.UploadedFile[];
  };

  type Documents<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    documents: FileUri[] | ScribePro.UploadedFile[];
  };

  type FileUri = {
    uri: string;
    name: string | null;
    type?: string;
    storageRef?: string;
    dimensions?: { height: number | null; width: number | null };
    height?: number;
    width?: number;
  };

  type Signature<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    signature: { uri: string };
  };

  // Old entry

  type ImageOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    image: { uri: string };
  };

  type ImagesOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    image: { uri: string }[];
  };

  type SignatureOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    signature: { uri: string }[];
  };

  //---------------------------------

  type entryFreeText = <A>(entry: {
    created: number;
    account: A;
    value: string;
  }) => FreeText<A>;

  type FreeText<A> = {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    text: string;
  };

  // Old entry

  type FreeTextOld = {
    timestamp: number | { _seconds: number; _nanoseconds: number };
    clinicianId: string;
    text: string;
  };
}
