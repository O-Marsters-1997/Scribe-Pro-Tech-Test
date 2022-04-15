/// <reference path="./archetypes.d.ts" />
/// <reference path="./scribepro.models.d.ts" />
/// <reference path="./main.d.ts" />

declare namespace Teams {
  type CollectionNames = {
    Teams: typeof TeamsCollectionName;
    Players: typeof PlayerCollectionName;
  };

  type FormNames = {
    Players: typeof PlayerCollectionName;
    Teams: typeof TeamsCollectionName;
  };

  type AccountDoc = {
    firstname?: string;
    lastname?: string;
    fullName?: string;
    email: string;
    phoneNumber: ScribePro.PhoneNumber;
    accpetedTsAndCs: boolean;
    selectedTeamId: string;
    playerId?: string;
    appVersion?: string;
    isClinician?: string;
  };

  type Account = { id: string } & AccountDoc;

  interface AccountDocAndView {
    doc: Account;
    view: AccountView;
  }

  interface AccountView {
    id: string;
    fullName: string | null;
    email: string | null;
    phoneNumber: string | null;
  }

  interface notification {
    id: string;
    receiver: {
      email: string;
      phoneNumber: ScribePro.PhoneNumber;
      playerId: string;
      fullName: string;
    };
    team: { name: string };
    timestamp: number;
    type: string;
  }

  // --------------------------------
  // -----------Team--------------
  // --------------------------------
  const TeamsCollectionName = "Teams";
  type TeamPaths = {
    readonly [P in keyof TeamData]: P;
  };

  type SportType = "football" | "rugby" | "other";

  interface TeamData extends State.Form<AccountView> {
    Name: Archetypes.FreeText<AccountView>;
    Type: Archetypes.Toggle<AccountView>;
    OtherTeamType: Archetypes.FreeText<AccountView>;
    Level: Archetypes.Toggle<AccountView>;
    SportType: Archetypes.Toggle<AccountView>;
    OtherSportType: Archetypes.FreeText<AccountView>;
  }

  type TeamFormData = {
    // Toggle
    Type?: string;
    Level?: string;
    Gender?: string;
    Tier?: string;
    SportType: string;

    // Freetext
    Name?: string;

    //Avatar
    Avatar?: { uri: string };
  };

  type TeamDoc = {
    data: TeamData;
  };

  type Team = TeamDoc & { id: string; tier: string };

  interface TeamView extends ScribePro.View {
    lastUpdatedBy: ScribePro.LastUpdatedByView;
    name: ScribePro.TextView;
    type: string | null;
    sport: ScribePro.TextView | null;
    sportValue: SportingContextVariants;
  }

  // --------------------------------
  // -----------Player--------------
  // --------------------------------

  const PlayersCollectionName = "Players";
  type PlayerPaths = {
    readonly [P in keyof PlayerData]: P;
  };

  interface PlayerData extends State.Form<AccountView> {
    FirstName: Archetypes.FreeText<AccountView>;
    LastName: Archetypes.FreeText<AccountView>;
    HandDominance: Archetypes.Toggle<AccountView>;
    FootDominance: Archetypes.Toggle<AccountView>;
    Allergies: Archetypes.MultiSelect<AccountView>;
    AllergiesOther: Archetypes.FreeText<AccountView>;
  }

  type PlayerDoc = {
    data: PlayerData;
    relations: { teamId: string };
    summary: PlayerSummary;
  };

  type Player = PlayerDoc & { id: string };

  interface PlayerView
    extends ScribePro.View<PlayerErrorMessage | ScribePro.CovidViewStatus> {
    fullName: ScribePro.TextView;
    otherAllergies: ScribePro.TextView;
    lastUpdatedBy: ScribePro.LastUpdatedByView;
    arm: {
      display: string | null;
    };
    foot: {
      display: string | null;
    };
  }
}
