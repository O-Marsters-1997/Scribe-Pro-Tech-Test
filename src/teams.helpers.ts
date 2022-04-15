import _ from "lodash";
import moment from "moment";

import {
  textValueSelector,
  toggleValueSelector,
  toggleViewSelector,
} from "./selectors";
import definitions from "./definitions";
import { TeamPaths } from "./constants/teams.constants";
import { formatPhoneNumber } from "./utils/utils";

export const getAccountView = (document: Teams.Account) => {
  return {
    id: document.id ?? null,
    fullName: document?.fullName ?? null,
    email: document.email ?? null,
    phoneNumber: formatPhoneNumber(document.phoneNumber) ?? null,
  };
};

export const getTeamView = ({
  data,
}: {
  data: Teams.TeamData;
}): Teams.TeamView => {
  return {
    lastUpdatedBy: getLastUpdatedBy(data),
    name: textValueSelector<Teams.AccountDoc, Teams.TeamData, string>(
      data,
      TeamPaths.Name
    ),
    sport: getSportType(data ?? {}),
    sportValue: (toggleValueSelector<Teams.AccountDoc, Teams.TeamData, string>(
      data,
      TeamPaths.SportType
    ) ?? "football") as Teams.SportType,
    type: toggleViewSelector<Teams.AccountDoc, Teams.TeamData, string>(
      data,
      TeamPaths.Type,
      definitions.teamType
    ),
  };
};

export const getSportType = (data: Teams.TeamData) => {
  if (!data) {
    return null;
  }

  let sportType: ScribePro.TextView = {
    display:
      toggleViewSelector(data, TeamPaths.SportType, definitions.sportType) ??
      "Football",
  };
  if (sportType.display === "Other") {
    sportType = textValueSelector(data, TeamPaths.OtherSportType);
  }

  return sportType;
};

export const getLastUpdatedBy = _.memoize(
  (docs?: { [key: string]: any }): ScribePro.LastUpdatedByView => {
    let lastUpdatedDate: null | string = null;
    let fullName: null | string = null;
    const email: null | string = null;

    if (docs) {
      const docsWithDate = _.compact(Object.values(docs)).filter(
        (doc) => doc.created || doc.timestamp
      );

      if (Array.isArray(docsWithDate) && docsWithDate.length > 0) {
        const lastUpdatedArchetype = _.sortBy(docsWithDate, [
          function (o) {
            return o.created ?? o.timestamp;
          },
        ])[docsWithDate.length - 1];

        if (lastUpdatedArchetype.timestamp) {
          lastUpdatedDate = moment(lastUpdatedArchetype.timestamp).format(
            "ddd DD MMM YY"
          );
        } else if (lastUpdatedArchetype.created) {
          lastUpdatedDate = moment(lastUpdatedArchetype.created).format(
            "ddd DD MMM YY"
          );
        }

        if (lastUpdatedArchetype.account) {
          if (lastUpdatedArchetype.account.fullName?.display) {
            fullName = lastUpdatedArchetype.account.fullName.display;
          } else if (lastUpdatedArchetype.account.fullName) {
            fullName = lastUpdatedArchetype.account.fullName;
          }
        } else if (lastUpdatedArchetype.clinicianId) {
          fullName = String(lastUpdatedArchetype.clinicianId);
        }
      }
    }

    return {
      date: lastUpdatedDate,
      fullName,
      email,
    };
  }
);
