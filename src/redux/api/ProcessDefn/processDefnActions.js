import {
  FETCH_PROCESS_DEFN_REQUEST,
  FETCH_PROCESS_DEFN_SUCCESS,
  FETCH_PROCESS_DEFN_FAILURE,
} from "./processDefnTypes";

import axios from "axios";
import queryString from "query-string";

export const fetchProcessDefn = (query) => {
  return async (dispatch) => {
    dispatch(fetchProcessDefnRequest());
    try {
      const response = await axios({
        method: "POST",
        url: "https://audiresb.oneintegral.com/backend/api/lease/processdefn",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: process.env.REACT_APP_TOKEN,
        },
        data: queryString.stringify({
          processName: query,
          tenantId: "AB00001",
        }),
      });
      const data = response.data.data;
      dispatch(fetchProcessDefnSuccess(data));
      //   return data;
    } catch (error) {
      dispatch(fetchProcessDefnFailure(error)); } }; }; 
export const fetchProcessDefnRequest = () => {
  return {
    type: FETCH_PROCESS_DEFN_REQUEST,
  };
};

export const fetchProcessDefnSuccess = (data) => {
  return {
    type: FETCH_PROCESS_DEFN_SUCCESS,
    payload: data,
  };
};

export const fetchProcessDefnFailure = (error) => {
  return {
    type: FETCH_PROCESS_DEFN_FAILURE,
    payload: error,
  };
};
