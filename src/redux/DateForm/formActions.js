import { DATE_FORM } from "./formTypes";

export const dateForm = (data) => {
  return {
    type: DATE_FORM,
    payload: data,
  };
};
