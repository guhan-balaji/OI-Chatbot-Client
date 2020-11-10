import { SELECT_PROCESS } from "./spTypes";

export const selectProcess = (data) => {
  return {
    type: SELECT_PROCESS,
    payload: data,
  };
};
