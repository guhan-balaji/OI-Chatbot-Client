import {
  FETCH_PROCESS_ARRAY_REQUEST,
  FETCH_PROCESS_ARRAY_SUCCESS,
  FETCH_PROCESS_ARRAY_FAILURE,
} from "./processArrayTypes";

import axios from "axios";
import queryString from "query-string";

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjU5YzRiMTc0ZTExMzBiYjViMjA5ZWEiLCJ1c2VybmFtZSI6IkhhcmlzaCIsInRlbmFudF9pZCI6IkFCMDAwMDEiLCJlbWFpbCI6ImhhcmlwcmFrYXNoLmJhYnVAb25laW50ZWdyYWwuY29tIiwib3JnYW5pemF0aW9uIjoiQUdTIEdyb3VwIiwiaWF0IjoxNjAzMjYwOTQ5LCJleHAiOjE2MDMzMDQxNDl9.vOklf3lT_gie_UN_RiEh35X-bQm_UtAUDkEde-qrOkg"

export const fetchProcessArray = (query) => {
  return async (dispatch) => {
    dispatch(fetchProcessArrayRequest());
    try {
      const response = await axios({
        method: "POST",
        url: "https://audiresb.oneintegral.com/backend/api/module/moduleProcess",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
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
