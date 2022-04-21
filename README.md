# Scribe Pro Tech Test

This repository contains the contents of the technical assesment completed for Scribe Pro. I was tasked with familiarising myself with a Code Base built in React using Typescript in, order to create a form component, using the existing software design.

## Contents

- Getting started
- What went well
- What could have gone better

## Getting Started

- To view this project please:
    1. Clone the repo
    2. Run `yarn install`
    3. Run `yarn start`

N.B: For reference most of the code that has been added or changed is in `src/archetypes/index.tsx`, `src/forms/Team.form.tsx` and `src/components/ButtonGroup.tsx`.

## What went well

1. I was happy that I eventually understood that an archetype was being used so that it could be used to target particular components and create them in a specific way.
    - This was difficult to get my head around at first, and the syntax for passing an argument into the new archetypes I created tripped me up for a while. But I was happy that I managed to get this done.
    - It also meant that I was able to access the definitions, holding the text content for buttons, as items within the form group component and could pass these down to the button groups by using the archetypes.

2. I was pleased that I was able to get the layout looking as it should. 
    - The simplest part of this was following the codebase to find the souce of the stylings and props for the input labels.
    - I then moved on to styling the buttons. After reading the style props within the `Button.jsx` file, I set the colorVariant o be `base` and the variant to be `square` to achieve this.
    - I then created one long array of the definitions objects and split this array into an array containing three sub-groups or chunks, each relating to the category of the contents for each button group.
    - I then gave the `ButtonGroup` components a `group` prop and assigned this to be `0` for the first category, `1` for the second and `2` for the third.
    - I then mapped over the items in a given currently selected `group` of items and returned as many buttons as there are items within this chunk, meaning 3 buttons for `items[0]`, 3 for `items[1]` and 9 for `items[2]`.
        - By using this method, I could access the `title` and `subtitle` props on this button to display the correct information.
    <br><br>
    ```
    const buttons = items[group].map((item: any) => {
        ...
        return (
        <Button
          isSelected={true}
          colorVariant="base"
          isDisabled={false}
          title={item.display}
          subtitle={item.sub}
          variant="square"
        ></Button>
      );
    ```
    *This is found starting line 61 of `ButtonGroup/index.tsx`*

    - Finally I was able to display the buttons either in a row or grid using a mixture of `flex-basis` and using `layout = "grid` on the final button group to ensure that the buttons would wrap and thus move on to the subsequent row.

    ## What could have gone better

    - I was unable to make the form fully functional.
        - I understand that within the `ButtonGroup` component the `value` and `onChange` props were important. But, having spent a long time looking through the rest of the code base and trying to understand the flow of the various onEvent prop methods, I was unable to ascertain what the `value` prop's role was within this context.
        - I am confident that if I were able to understand this then I would know what role the `onChange` would have in order to change this and would be closer to understanding how to solve this problem.
        - Although I was unable to produce an entirely functional form, and instead it is static. I have demonstrated an ability to use logic to differentiate between the values of the props, that I have understood to be relavant to this task.

    
    I hope you have enjoyed reading this explanation of the work that I have done and if you have any further questions I would be happy to answer them.
