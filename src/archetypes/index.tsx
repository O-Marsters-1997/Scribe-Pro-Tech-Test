import React from "react";

import { createFreeText } from "../archetypeCreators/createFreeText";
import { createMultiSelect } from "../archetypeCreators/createMultiSelect";
import { createToggle } from "../archetypeCreators/createToggle";
import definitions from "../definitions";

import ButtonGroup, { ButtonGroupProps } from "../components/ButtonGroup";
import TextArea, { TextAreaProps } from "../components/TextArea";
import TextInput, { TextInputProps } from "../components/TextInput";

// I think I understand the intended result. By my understanding you are looking for the creation of another archetype that corresponds to the multiselect.
// This archetype would take the definitions as an argument, therefore you would be able to map over the arrays that are properties of the definitions object and ensure that each button's title and subtitle correspond with the nth item within that array.

// My understanding is that you also would be able to access the buttongroup props within the Buttons archetype I have defined below.



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

  // This is an array for type
  const arr1: Array<any> = items.slice(20, 23);
  
  // This is an array for sport type
  const arr2: Array<any> = items.slice(8, 11);
  
  // This is an array for level
  const arr3: Array<any> = items.slice(11, 20);

  // Here I am instantiating a new array which is a combinations of the three ones that I have made
  const arrs = new Array<any>(arr1, arr2, arr3);
  return arrs;
}

let items = arrayOfArrays();

// Below is my attempt to access the definitions via the archetype and then insert that within the form

// Okay so now I know the objective is to crreate another Archetype that is exportable from the create multiselect.
export default {
  Text: createFreeText<Teams.AccountView, TextInputProps>()(TextInput),
  Notes: createFreeText<Teams.AccountView, TextAreaProps>()(TextArea),
  // The toggle and mutiselect archetypes are created here in the same way because they each take one argument, which are the definitions.
  Toggle: createToggle<Teams.AccountView, ButtonGroupProps>({
    definition: { items },
  })(ButtonGroup),
  Multi: createMultiSelect<Teams.AccountView, ButtonGroupProps>({
    definition: { items },
  })(ButtonGroup),
} as Archetypes;
