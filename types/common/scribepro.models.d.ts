/// <reference path="./archetypes.d.ts" />
/// <reference path="./../../node_modules/firebase/index.d.ts" />
/// <reference path="./../../node_modules/@react-native-firebase/auth/lib/index.d.ts" />

declare namespace ScribePro {
  type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
    infer ElementType
  >
    ? ElementType
    : never;

  type ViewDataTypes =
    | PhoneNumberView
    | TextView
    | ImageView
    | DocView
    | ImageView[]
    | DocView[]
    | Archetypes.Images<unknown>
    | Archetypes.Documents<unknown>
    | null
    | boolean
    | number
    | string;

  interface ViewData<DT> {
    [key: string]: DT | LastUpdatedByView;
  }

  type UploadedFile = {
    uri: string | null;
    type: string | null;
    name?: string | null;
    dimensions?: { height: number | null; width: number | null };
    storageRef: string | null;
    uploadedBy: string;
  };

  interface View<E = unknown> {
    [key: string]:
      | ViewData<ViewDataTypes>[]
      | ViewData<ViewDataTypes>
      | ViewDataTypes
      | E
      | (() => E)
      | View
      | LastUpdatedByView;
  }

  type ViewHelper<D extends State.Form<unknown>, DV extends View> = (args: {
    data: D;
  }) => DV | null;

  type Doc<D> = { view: ViewData<ViewDataTypes>; data: D };

  interface TextEntry<A> {
    created: number | { _seconds: number; _nanoseconds: number };
    account: A;
    text: string;
  }

  type TextView = {
    display: string | null;
    label?: string;
    colorVariant?: ScribePro.ColorVariants;
    type?: ScribePro.TextType;
    value?: string | number | null;
  };

  type PhoneNumberView = {
    type: "phoneNumber";
    display: string | null;
  };

  type Image = { uri: string | null; uploded?: boolean; name?: string } | null;
  type ImageView = { uri: string | null; uploded?: boolean } | null;
  type Document = { uri: string | null; uploded?: boolean } | null;
  type DocView = { uri: string | null; uploded?: boolean } | null;

  interface NullDocAndView {
    doc?: null;
    view?: null;
  }

  interface LastUpdatedByView {
    [key: string]: string | null;
    email: string | null;
    date: string | null;
    fullName: string | null;
  }

  type LastUpdatedBy = {
    timestamp: number;
    email: string | null;
    fullName: string | null;
    phoneNumber: string | null;
    id: string;
  };

  type WithAccount<P, AV, InjectedKeys extends keyof { account: AV }> = (
    Component: JSX.Element<P>
  ) => (props: Omit<P, InjectedKeys>) => JSX.Element<P>;
}
