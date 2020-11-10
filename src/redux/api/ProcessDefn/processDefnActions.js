import {
  FETCH_PROCESS_DEFN_REQUEST,
  FETCH_PROCESS_DEFN_SUCCESS,
  FETCH_PROCESS_DEFN_FAILURE,
} from "./processDefnTypes";

import axios from "axios";
import queryString from "query-string";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjU5YzRiMTc0ZTExMzBiYjViMjA5ZWEiLCJ1c2VybmFtZSI6IkhhcmlzaCIsInRlbmFudF9pZCI6IkFCMDAwMDEiLCJlbWFpbCI6ImhhcmlwcmFrYXNoLmJhYnVAb25laW50ZWdyYWwuY29tIiwib3JnYW5pemF0aW9uIjoiQUdTIEdyb3VwIiwiaWF0IjoxNjAzMjYwOTQ5LCJleHAiOjE2MDMzMDQxNDl9.vOklf3lT_gie_UN_RiEh35X-bQm_UtAUDkEde-qrOkg";

export const fetchProcessDefn = (query) => {
  return async (dispatch) => {
    dispatch(fetchProcessDefnRequest());
    try {
      const response = await axios({
        method: "POST",
        url: "https://audiresb.oneintegral.com/backend/api/lease/processdefn",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
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
      dispatch(fetchProcessDefnFailure(error));
    }
  };
};

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
