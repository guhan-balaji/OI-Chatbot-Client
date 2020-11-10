import {
  FETCH_DIALOGFLOW_REQUEST,
  FETCH_DIALOGFLOW_SUCCESS,
  FETCH_DIALOGFLOW_FAILURE,
} from "./dialogflowTypes";

const initialState = {
  loading: false,
  response: {},
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DIALOGFLOW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DIALOGFLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        error: "",
      };
    case FETCH_DIALOGFLOW_FAILURE:
      return {
        ...state,
        loading: false,
        response: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
