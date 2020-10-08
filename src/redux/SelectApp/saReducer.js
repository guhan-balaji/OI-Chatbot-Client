import { SELECT_APP } from "./saTypes";

const initialState = {
  app: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_APP:
      return {
        ...state,
        app: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;