import { DATE_FORM } from "./formTypes";

const initialState = {
  startDate: "",
  endDate: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATE_FORM:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    default:
      return state;
  }
};

export default reducer;
