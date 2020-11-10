import { SELECT_APP } from "./saTypes";

export const selectApp = (selectedApp) => {
  return {
    type: SELECT_APP,
    payload: selectedApp,
  };
};