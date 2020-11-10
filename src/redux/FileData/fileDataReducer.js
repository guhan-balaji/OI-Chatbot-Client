import { FILE_DATA } from "./fileDataTypes";

const initialState = {
  file: null,
  fileName: "",
  fileSize: "0.00 B",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
