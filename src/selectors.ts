import _ from "lodash";

export const getEntry = <Acc, E>(data: State.Form<Acc>, path: string) => {
  return ((_.get(data, path) ?? null) as unknown) as E | null;
};

export function textValueSelector<Acc, D, A extends string>(
  data: D,
  path: A
): ScribePro.TextView {
  let textType: ScribePro.TextType = undefined;
  const entry = getEntry<Acc, string>(data, `${path}.value`);

  const text = entry ? entry : null;

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = re.test(String(text).toLowerCase());

  if (isValidEmail) {
    textType = "email";
  }

  if (textType) {
    return { display: text ? String(text) : null, type: textType };
  }

  return { display: text ? String(text) : null };
}

export const textAreaValueSelector = <Acc, D, A extends string>(
  data: D,
  path: A
) => {
  const archetype = _.get(data, path) as Archetypes.FreeText<Acc>;
  const text = archetype ? archetype?.text : null;

  return { display: text };
};

export const getFullName = <Acc>(
  data: State.Form<Acc>,
  paths: { firstname: string; lastname: string }
): ScribePro.TextView => {
  let fullName: string | null = null;
  const firstname = getEntry(data, `${paths.firstname}.value`) as string | null;
  const lastname = getEntry(data, `${paths.lastname}.value`) as string | null;

  if (firstname) {
    fullName = firstname;
  }

  if (lastname) {
    if (!fullName) {
      fullName = lastname;
    }
    fullName += ` ${lastname}`;
  }

  return {
    display: fullName,
    label: "Full name",
  };
};

export const toggleViewSelector = <Acc, D, A extends string>(
  data: D,
  path: A,
  definition: Definitions.Toggle
) => {
  const entry = getEntry<Acc, string | number>(data, `${path}.value`);
  const item = _.find(definition.items, (o) => o.value === entry);

  return item?.display ?? null;
};

export const toggleValueSelector = <Acc, D, A extends string>(
  data: D,
  path: A,
  entryPath = "value"
) => {
  const entry = getEntry<Acc, string | number | boolean>(
    data,
    `${path}.${entryPath}`
  );

  return entry;
};

export const multiSelectValuesSelector = <Acc, D, A extends string>(
  data: D,
  path: A
) => {
  const entry = getEntry<Acc, Array<string | number>>(data, `${path}.values`);

  return entry;
};

export const multiSelectViewSelector = <Acc, D, A extends string>(
  data: D,
  path: A,
  definition: Definitions.MultiSelect
) => {
  const entry = getEntry<Acc, Array<string | number | boolean>>(
    data,
    `${path}.values`
  );

  const items = definition.items.filter((o) => entry?.includes(o.value));

  if (_.isEmpty(items) || typeof items === "number") {
    return null;
  }

  return items.map((item) => item.display).join(" | ");
};
