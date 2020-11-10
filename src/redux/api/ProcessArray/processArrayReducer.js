import {
  FETCH_PROCESS_ARRAY_REQUEST,
  FETCH_PROCESS_ARRAY_SUCCESS,
  FETCH_PROCESS_ARRAY_FAILURE,
} from "./processArrayTypes";

const initialState = {
  loading: false,
  response: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROCESS_ARRAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROCESS_ARRAY_SUCCESS:
      return {
        loading: false,
        response: action.payload,
        error: "",
      };
    case FETCH_PROCESS_ARRAY_FAILURE:
      return {
        loading: false,
        response: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
