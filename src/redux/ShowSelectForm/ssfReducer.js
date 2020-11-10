import { SHOW_SELECT_FORM } from "./ssf.types";

const initialState = {
  visible: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SELECT_FORM:
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
