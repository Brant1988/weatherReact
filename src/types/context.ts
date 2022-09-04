export interface AppContextInterface {
  authToken: string | "";
  selectedState: string | "";
  selectedCity: string | "";
}

export type Action =
  | {
      type: "SET_TOKEN";
      payload: string;
    }
  | {
      type: "SET_STATE";
      payload: string;
    }
  | {
      type: "SET_CITY";
      payload: string;
    };
