import { DATA_LOAD } from "./dlTypes";

const initialState = {
  dataLoad: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOAD:
      return {
        ...state,
        dataLoad: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
