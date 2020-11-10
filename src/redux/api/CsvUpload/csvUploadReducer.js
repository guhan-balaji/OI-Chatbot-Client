import {
  FETCH_CSV_UPLOAD_REQUEST,
  FETCH_CSV_UPLOAD_SUCCESS,
  FETCH_CSV_UPLOAD_FAILURE,
} from "./csvUploadTypes";

const initalState = {
    loading: false,
    response: [],
    error: ""
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
      case FETCH_CSV_UPLOAD_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_CSV_UPLOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          response: action.payload,
          error: "",
        };
      case FETCH_CSV_UPLOAD_FAILURE:
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