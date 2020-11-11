import axios from "axios";
import {
  FETCH_DIALOGFLOW_REQUEST,
  FETCH_DIALOGFLOW_SUCCESS,
  FETCH_DIALOGFLOW_FAILURE,
} from "./dialogflowTypes";

import { selectApp, dataLoad, fetchProcessArray } from "../../index"

export const fetchFromDialogflow = (query) => {
  // console.log("query: " + query);
  return async (dispatch) => {
    dispatch(fetchDialogflowRequest());
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8080/api/textQuery",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ text: query }),
      });
      const data = await response.data;
      // console.log(data);
      dispatch(fetchDialogflowSuccess(data));
      if (data.intent === "SelectApp") {
        dispatch(selectApp(data.value));
        dispatch(fetchProcessArray(data.value));
      } else if (data.intent === "DataLoadOptions") {
        dispatch(dataLoad(data.value));
      }
      return data;
    } catch (error) {
      dispatch(fetchDialogflowFailure(error.details));
    }
  };
};

export const fetchDialogflowRequest = () => {
  return {
    type: FETCH_DIALOGFLOW_REQUEST,
  };
};

export const fetchDialogflowSuccess = (data) => {
  return {
    type: FETCH_DIALOGFLOW_SUCCESS,
    payload: data,
  };
};

export const fetchDialogflowFailure = (error) => {
  return {
    type: FETCH_DIALOGFLOW_FAILURE,
    payload: error,
  };
};
