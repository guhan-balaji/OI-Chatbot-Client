import { DATA_LOAD } from "./dlTypes";

export const dataLoad = (data) => {
  return {
    type: DATA_LOAD,
    payload: data,
  };
};
