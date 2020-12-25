import {
  FETCH_PROCESS_ARRAY_REQUEST,
  FETCH_PROCESS_ARRAY_SUCCESS,
  FETCH_PROCESS_ARRAY_FAILURE,
} from "./processArrayTypes";

import axios from "axios";
import queryString from "query-string";

export const fetchProcessArray = (query) => {
  return async (dispatch) => {
    dispatch(fetchProcessArrayRequest());
    try {
      const response = await axios({
        method: "POST",
        url: "https://audiresb.oneintegral.com/backend/api/module/moduleProcess",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: process.env.REACT_APP_TOKEN,
        },
        data: queryString.stringify({
          tenantId: "AB00001",
          moduleName: query.split(" ").join("_"),
        }),
      });
      const data = await response.data.data;
      dispatch(fetchProcessArraySuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchProcessArrayFailure(error));
    }
  };
};

export const fetchProcessArrayRequest = () => {
  return {
    type: FETCH_PROCESS_ARRAY_REQUEST,
  };
};

export const fetchProcessArraySuccess = (data) => {
  return {
    type: FETCH_PROCESS_ARRAY_SUCCESS,
    payload: data,
  };
};

export const fetchProcessArrayFailure = (error) => {
  return {
    type: FETCH_PROCESS_ARRAY_FAILURE,
    payload: error,
  };
};
