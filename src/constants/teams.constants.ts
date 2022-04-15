/*
 * To add a new constant first add it to types/teams/, if it's a new type of constants create the file and add them in,
 * if it's part of the forms constants add it to forms.d.ts, then in this file referece the constant that  you've
 * added. Teams is a namespace under which all the constants that are related to the Teams app reside.
 * */

// ----------------------------------
// -----------Forms Paths-------
// ----------------------------------
export const FormNames: Teams.FormNames = {
  Players: "Players",
  Teams: "Teams",
};

export const TeamPaths: Teams.TeamPaths = {
  Name: "Name",
  Type: "Type",
  OtherTeamType: "OtherTeamType",
  SportType: "SportType",
  OtherSportType: "OtherSportType",
  Level: "Level",
};

export const PlayerPaths: Teams.PlayerPaths = {
  LastName: "LastName",
  FirstName: "FirstName",
  HandDominance: "HandDominance",
  FootDominance: "FootDominance",
  Allergies: "Allergies",
  AllergiesOther: "AllergiesOther",
};

export const Collections: Teams.CollectionNames = {
  Players: "Players",
  Teams: "Teams",
};
