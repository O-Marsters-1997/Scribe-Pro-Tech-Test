import React from "react";

import { checkValidInput, checkMinLength } from "../utils/validation.utils";
import { TeamPaths } from "../constants/teams.constants";

import FormContainer from "../components/FormContainer";
import FormInputContainer from "../components/FormInputContainer";
import InputLabel from "../components/InputLabel";
import ButtonGroup from "../components/ButtonGroup";
import { Archetypes } from "../archetypes";

type Props = {
  isSportTypeLocked?: boolean;
  offline?: boolean;
};

function createTeamForm(Archetypes: Archetypes) {
  const TeamFrom = (_props: Props) => {
    return (
      <FormContainer>
        <FormInputContainer>
          <InputLabel iconName="free-text-solid" title="Name" required />
          <Archetypes.Text
            path={TeamPaths.Name}
            validations={{
              required: checkValidInput,
              minLength: checkMinLength(2),
            }}
          />
        </FormInputContainer>
        <ButtonGroup/>
      </FormContainer>
    );
  };

  return TeamFrom;
}

export { createTeamForm };
