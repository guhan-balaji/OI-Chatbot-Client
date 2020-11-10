import { SELECT_PROCESS } from "./spTypes";

const initialState = {
  process: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PROCESS:
      return {
        ...state,
        process: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
