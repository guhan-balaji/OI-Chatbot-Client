import {
    FETCH_DOWNLOAD_TEMPLATE_REQUEST,
    FETCH_DOWNLOAD_TEMPLATE_SUCCESS,
    FETCH_DOWNLOAD_TEMPLATE_FAILURE,
  } from "./downloadTemplateTypes";
  
  const initalState = {
    loading: "",
    response: [],
    error: "",
  };
  
  const reducer = (state = initalState, action) => {
    switch (action.type) {
      case FETCH_DOWNLOAD_TEMPLATE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_DOWNLOAD_TEMPLATE_SUCCESS:
        return {
          ...state,
          loading: false,
          response: action.payload,
          error: "",
        };
      case FETCH_DOWNLOAD_TEMPLATE_FAILURE:
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
  