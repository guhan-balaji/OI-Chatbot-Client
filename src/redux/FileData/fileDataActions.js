import { FILE_DATA } from "./fileDataTypes";

export const fileData = (data) => {
  return {
    type: FILE_DATA,
    payload: data,
  };
};
