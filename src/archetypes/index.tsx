import React from "react";

import { createFreeText } from "../archetypeCreators/createFreeText";
import { createMultiSelect } from "../archetypeCreators/createMultiSelect";
import definitions from "../definitions";

import ButtonGroup, { ButtonGroupProps } from "../components/ButtonGroup";
import TextArea, { TextAreaProps } from "../components/TextArea";
import TextInput, { TextInputProps } from "../components/TextInput";

// I think I understand the intended result. By my understanding you are looking for the creation of another archetype that corresponds to the multiselect.
// This archetype would take the definitions as an argument, therefore you would be able to map over the arrays that are properties of the definitions object and ensure that each button's title and subtitle correspond with the nth item within that array.

// My understanding is that you also would be able to access the buttongroup props within the Buttons archetype I have defined below.

// Unfortunately due to time limitations I have not been able to action this understanding.
// To ensure that I have something to produce I instead plan to reimport the definitons within the form and access them from there and pass them down as props to button groups and buttons.
// I will then focus on styling the buttons to look like the images with styled components and attempt to make the form as functional as possible.

export type Archetypes = {
  [archetypeName: string]: React.FC<
    | Archetypes.ToggleTypes.Props<Teams.AccountView, ButtonGroupProps>
    | Archetypes.FreeTextTypes.Props<Teams.AccountView, TextInputProps>
    | Archetypes.FreeTextTypes.Props<Teams.AccountView, TextAreaProps>
    | Archetypes.MultiSelectTypes.Props<Teams.AccountView, ButtonGroupProps>
  >;
};

// This function it creates a concatenated array of all the defintions and then it divides them into three sub arrays based on the categories required
function arrayOfArrays() {
  let items: Array<Definitions.Item> = Object.values(definitions)
    .map((definition) => definition.items)
    .reduce((items, accumulator) => {
      return accumulator.concat(items);
    }, []);
  const arr1: Array<any> = items.slice(-4, -1);
  const arr2: Array<any> = items.slice(8, 11);
  const arr3: Array<any> = items.slice(12, 18);
  const arrs = new Array<any>(arr1, arr2, arr3);
  return arrs;
}

let items = arrayOfArrays();



// Below is my attempt to access the definitions via the archetype and then insert that within the form
// [[item1, item2], [item1, item2]]


// Okay so now I know the objective is to crreate another Archetype that is exportable from the create multiselect.
export default {
  Text: createFreeText<Teams.AccountView, TextInputProps>()(TextInput),
  Notes: createFreeText<Teams.AccountView, TextAreaProps>()(TextArea),
  // { definition: { items: [...] } }
  Buttons: createMultiSelect<Teams.AccountView, ButtonGroupProps>({
    definition: { items },
  })(ButtonGroup),
} as Archetypes;
