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
          <Archetypes.Toggle
            path={TeamPaths.Level}
            layout="grid"
            group={2}
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
