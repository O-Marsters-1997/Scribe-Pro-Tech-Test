// -------------- Definitions -------------------
//
declare namespace Definitions {
  type Text = {
    description?: string;
  };

  type FreeTextNumber = {
    min?: number;
    max?: number;
    step?: number;
  };

  type Timestamp = {
    format: string;
  };

  type Item = {
    value: string | number;
    display: string;
    translationKey?: string;
    text?: string;
    sub?: string;
    colorVariant?: ScribePro.ColorVariants;
  };

  type Toggle = {
    items: Array<Item>;
  };

  type PainScore = {
    items: Array<{ display: string; value: number; text: string }>;
  };

  type MultiSelect = {
    items: Array<Item>;
  };

  type FilePicker = {
    defaultFilePath?: string;
    size?: string;
  };

  type MedicationItem = {
    value: string;
    type: string;
    display: string;
    doses: (string | number)[];
    unit?: string | undefined;
    route?: string;
  };

  type MedicationItems = {
    items: MedicationItem[];
  };

  interface Gcs {
    total: {
      min: number;
      max: number;
      defaultValue: number;
    };
    eye: SpecificGcs;
    verbal: SpecificGcs;
    motor: SpecificGcs;
  }

  interface GcsValue {
    eye: number;
    verbal: number;
    motor: number;
    total: number;
  }

  interface SpecificGcs {
    min: number;
    max: number;
    defaultValue: number;
    items: Array<{ value: number; display: string; subtitle: string }>;
  }
}
