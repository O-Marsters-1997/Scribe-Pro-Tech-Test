/// <reference path="./archetypes.d.ts" />
//
declare namespace State {
  type AppState<A> = {
    errors: ErrorState;
    form: Form<A>;
    formState: FormStatusState;
  };

  type ActionTypes = {
    REMOVE_DOCUMENT_ERROR: typeof REMOVE_DOCUMENT_ERROR;
    RESTORE_CACHED_FORM_DATA: typeof RESTORE_CACHED_FORM_DATA;
    DOCUMENT_SAVED: typeof DOCUMENT_SAVED;
    EXITED_NESTED_FORM: typeof EXITED_NESTED_FORM;
    EXITED_FORM: typeof EXITED_FORM;
    SHOWING_FORM_ERRORS: typeof SHOWING_FORM_ERRORS;
    SET_REQUIRED_NESTED: typeof SET_REQUIRED_NESTED;
    ADD_DOCUMENT_ERROR: typeof ADD_DOCUMENT_ERROR;
    RESET_FORM: typeof RESET_FORM;
    CLEAR_FORM_STATUS: typeof CLEAR_FORM_STATUS;
    UPDATE_ENTRY_ERRORS: typeof UPDATE_ENTRY_ERRORS;
    CACHE_FORM_DATA: typeof CACHE_FORM_DATA;
    ADD_FORM_DATA: typeof ADD_FORM_DATA;
    RESET_ENTRY: typeof RESET_ENTRY;
    ADD_ENTRY: typeof ADD_ENTRY;
    DELETE_ENTRY: typeof DELETE_ENTRY;
    ADD_INCIDENT: typeof ADD_INCIDENT;
  };

  const CLEAR_FORM_STATUS = "CLEAR_FORM_STATUS";
  type ClearFormStatus = {
    type: typeof CLEAR_FORM_STATUS;
  };

  const SET_REQUIRED_NESTED = "SET_REQUIRED_NESTED";
  type SetRequiredNested = {
    type: typeof SET_REQUIRED_NESTED;
    payload: {
      formContext: string;
    };
  };

  const SHOWING_FORM_ERRORS = "SHOWING_FORM_ERRORS";
  type ShowFormErrors = {
    type: typeof SHOWING_FORM_ERRORS;
    payload: {
      formContext: string;
    };
  };

  const EXITED_FORM = "EXITED_FORM";
  type ExitedNestedForm = {
    type: typeof EXITED_FORM;
    payload: {
      formContext: string;
    };
  };

  const EXITED_NESTED_FORM = "EXITED_NESTED_FORM";
  type ExitedNestedForm = {
    type: typeof EXITED_NESTED_FORM;
    payload: {
      formContext: string;
    };
  };

  const RESTORE_CACHED_FORM_DATA = "RESTORE_CACHED_FORM_DATA";
  type RestoreCachedFormData = {
    type: typeof RESTORE_CACHED_FORM_DATA;
    payload: {
      formContext: string;
    };
  };

  const REMOVE_DOCUMENT_ERROR = "REMOVE_DOCUMENT_ERROR";
  type RemoveDocumentErrors = {
    type: typeof REMOVE_DOCUMENT_ERROR;
    payload: {
      formContext: string;
    };
  };

  const ADD_DOCUMENT_ERROR = "ADD_DOCUMENT_ERROR";
  type ShowEntriesErrors = {
    type: typeof ADD_DOCUMENT_ERROR;
    payload: {
      formContext: string;
      error: unknown | string;
    };
  };

  const DOCUMENT_SAVED = "DOCUMENT_SAVED";
  type DocumentSaved = {
    type: typeof DOCUMENT_SAVED;
    payload: {
      formContext: string;
    };
  };

  const RESET_FORM = "RESET_FORM";
  type ResetForm = {
    type: typeof RESET_FORM;
    payload: {
      formContext: string;
    };
  };

  const UPDATE_ENTRY_ERRORS = "UPDATE_ENTRY_ERRORS";
  type ResetEntryErrors = {
    type: typeof UPDATE_ENTRY_ERRORS;
    payload: {
      formContext: string;
      errors: Archetypes.ValidationResult[];
      path: string;
    };
  };

  const CACHE_FORM_DATA = "CACHE_FORM_DATA";
  type CacheFormData = {
    type: typeof CACHE_FORM_DATA;
    payload: {
      formContext: string;
    };
  };

  const ADD_FORM_DATA = "ADD_FORM_DATA";
  type AddFormData<A> = {
    type: typeof ADD_FORM_DATA;
    payload: {
      formContext: string;
      data: {
        [key: string]:
          | Archetypes.Entry<A>
          | Archetypes.EntryOld
          | {
              [key: string]: Archetypes.Entry<A> | Archetypes.EntryOld;
            };
      };
    };
  };

  const RESET_ENTRY = "RESET_ENTRY";
  type ResetEntry = {
    type: typeof RESET_ENTRY;
    payload: {
      path: string;
      formContext: string;
    };
  };

  const ADD_ENTRY = "ADD_ENTRY";
  type AddEntry<A> = {
    type: typeof ADD_ENTRY;
    payload: {
      path: string;
      formContext: string;
      serialized: Archetypes.Entry<A>;
    };
  };

  const DELETE_ENTRY = "DELETE_ENTRY";
  type DeleteEntry = {
    type: typeof DELETE_ENTRY;
    payload: {
      index: number;
      formContext: string;
    };
  };

  const ADD_INCIDENT = "ADD_INCIDENT";
  type AddIncident = {
    type: typeof ADD_INCIDENT;
    payload: {
      data: any;
    };
  };

  type Actions<A> =
    | SetRequiredNested
    | ClearFormStatus
    | DocumentSaved
    | ResetForm
    | ResetEntryErrors
    | CacheFormData
    | AddFormData<A>
    | ResetEntry
    | AddEntry<A>
    | DeleteEntry
    | AddIncident
    | ExitedNestedForm
    | ExitedForm
    | RestoreCachedFormData
    | ShowEntriesErrors
    | RemoveDocumentErrors;

  type ErrorState = {
    [key: string]: {
      required?: boolean;
      error?: unknown | string | null;
      archetypes?: {
        [path: string]: {
          errors: Archetypes.ValidationResult[];
        };
      };
    };
  };

  type FormStatusState = {
    [key: string]: typeof DOCUMENT_SAVED | typeof EXITED_NESTED | null;
  };

  type Form<A> = {
    [key: string]:
      | Form<A>
      | { [key: string]: Form<A> }
      | { [key: string]: Array<Form<A>> }
      | ({ [key: string]: Form<A> } & Form<A>)
      | ({ [key: string]: Array<Form<A>> } & Form<A>)
      | Entry<A>
      | Entry<A>[];
  };

  type FormState<A> = {
    [rootFormName: string]: Form<A>;
  };
}
