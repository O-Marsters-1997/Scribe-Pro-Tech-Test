import React from "react";

import { createFreeText } from "../archetypeCreators/createFreeText";
import { createMultiSelect } from "../archetypeCreators/createMultiSelect";
import definitions from "../definitions";

import ButtonGroup, { ButtonGroupProps } from "../components/ButtonGroup";
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

// [[item1, item2], [item1, item2]]
let items: Array<Definitions.Item> = Object.values(definitions).map(definition => definition.items).reduce((items, accumulator) => {
  return accumulator.concat(items)
}, [])

// Okay so now I know the objective is to crreate another Archetype that is exportable from the create multiselect. 
export default {
  Text: createFreeText<Teams.AccountView, TextInputProps>()(TextInput),
  Notes: createFreeText<Teams.AccountView, TextAreaProps>()(TextArea),
  // { definition: { items: [...] } }
  Buttons: createMultiSelect<Teams.AccountView, ButtonGroupProps>({
    definition: { items },
  })(ButtonGroup),
} as Archetypes;


