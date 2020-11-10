import {
    FETCH_PROCESS_DEFN_REQUEST,
    FETCH_PROCESS_DEFN_SUCCESS,
    FETCH_PROCESS_DEFN_FAILURE,
  } from "./processDefnTypes";
  
  const initalState = {
    loading: "",
    response: [],
    error: "",
  };
  
  const reducer = (state = initalState, action) => {
    switch (action.type) {
      case FETCH_PROCESS_DEFN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_PROCESS_DEFN_SUCCESS:
        return {
          ...state,
          loading: false,
          response: action.payload,
          error: "",
        };
      case FETCH_PROCESS_DEFN_FAILURE:
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
  