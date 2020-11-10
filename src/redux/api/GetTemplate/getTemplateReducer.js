import {
  FETCH_GET_TEMPLATE_REQUEST,
  FETCH_GET_TEMPLATE_SUCCESS,
  FETCH_GET_TEMPLATE_FAILURE,
} from "./getTemplateTypes";

const initalState = {
  loading: "",
  response: [],
  error: "",
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_GET_TEMPLATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_GET_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        error: "",
      };
    case FETCH_GET_TEMPLATE_FAILURE:
      return {
        ...state,
        loading: false,
        response: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
