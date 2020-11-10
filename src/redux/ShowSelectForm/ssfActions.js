import { SHOW_SELECT_FORM } from "./ssf.types";

export const showSelectForm = (data) => {
  return {
    type: SHOW_SELECT_FORM,
    payload: data,
  };
};
