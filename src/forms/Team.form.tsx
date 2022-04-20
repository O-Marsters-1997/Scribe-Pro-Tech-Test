import React, { useState, useEffect } from "react";

import { checkValidInput, checkMinLength } from "../utils/validation.utils";
import { TeamPaths } from "../constants/teams.constants";

import FormContainer from "../components/FormContainer";
import FormInputContainer from "../components/FormInputContainer";
import InputLabel from "../components/InputLabel";
import ButtonGroup from "../components/ButtonGroup";
import { Archetypes } from "../archetypes";
// Importing definitions in here
import definitions from "../definitions";

// Okay so I think the objective is to access the button group props in this file so that
// two rows of buttons can be displayed as rows and the other can be displayed as a grid.

type Props = {
  isSportTypeLocked?: boolean;
  offline?: boolean;
};

function createTeamForm(Archetypes: Archetypes) {
  const TeamFrom = (_props: Props) => {
    const [defs, setDefs] = useState({});

    // This use effect sets the state of the defs to the imported definitions
    useEffect(() => {
      if (definitions) {
        setDefs(definitions);
      }
    });

    return (
      <FormContainer>
        <FormInputContainer>
          <InputLabel iconName="free-text-solid" title="Name" required />
          <Archetypes.Text
            path={TeamPaths.Name}
            placeholder="Manchester United F.C"
            validations={{
              required: checkValidInput,
              minLength: checkMinLength(2),
            }}
          />
        </FormInputContainer>
        <FormInputContainer>
          <InputLabel iconName="team" title="Type" />
          <Archetypes.Toggle
            path={TeamPaths.Type}
            layout="list-horizontal"
            group={0}
            index={0}
          />
        </FormInputContainer>
        <FormInputContainer>
          <InputLabel iconName="team" title="Sport Type" required />
          <Archetypes.Toggle
            path={TeamPaths.SportType}
            layout="list-horizontal"
            group={1}
            index={0}
          />
        </FormInputContainer>
        <FormInputContainer>
          {/* Sorry I can't see clearly what icon in the images this actually is so I've just gone with a different one to show ive read it from the css file */}
          <InputLabel iconName="up-dir" title="Level" />
          {/* I used the multi here instead of toggle as I noticed that only it has the number of columns prop but I have been unable to do anything with it */}
          <Archetypes.Multi
            path={TeamPaths.Level}
            layout="grid"
            group={2}
            // I feel like number of columns is relavant. I would write a function in the styled components that determines flex basis depending on this number if th layout is set to grid
            // For some reason flex basis and every other method I can think od does not stop each button starting on a new line so I have not been able to implement this idea.
            numberOfColumns={3}
            index={1}
          />
        </FormInputContainer>
      </FormContainer>
    );
  };

  return TeamFrom;
}

export { createTeamForm };
