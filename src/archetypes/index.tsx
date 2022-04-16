import React from "react";

import { createFreeText } from "../archetypeCreators/createFreeText";
import definitions from "../definitions";

import { ButtonGroupProps } from "../components/ButtonGroup";
import TextArea, { TextAreaProps } from "../components/TextArea";
import TextInput, { TextInputProps } from "../components/TextInput";

export type Archetypes = {
  [archetypeName: string]: React.FC<
    | Archetypes.ToggleTypes.Props<Teams.AccountView, ButtonGroupProps>
    | Archetypes.FreeTextTypes.Props<Teams.AccountView, TextInputProps>
    | Archetypes.FreeTextTypes.Props<Teams.AccountView, TextAreaProps>
    | Archetypes.MultiSelectTypes.Props<Teams.AccountView, ButtonGroupProps>
  >;
};

export default {
  Text: createFreeText<Teams.AccountView, TextInputProps>()(TextInput),
  Notes: createFreeText<Teams.AccountView, TextAreaProps>()(TextArea),
} as Archetypes;
