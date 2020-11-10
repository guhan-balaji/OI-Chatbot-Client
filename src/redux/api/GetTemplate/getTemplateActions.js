import {
  FETCH_GET_TEMPLATE_REQUEST,
  FETCH_GET_TEMPLATE_SUCCESS,
  FETCH_GET_TEMPLATE_FAILURE,
} from "./getTemplateTypes";

import axios from "axios";
import queryString from "query-string";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjU5YzRiMTc0ZTExMzBiYjViMjA5ZWEiLCJ1c2VybmFtZSI6IkhhcmlzaCIsInRlbmFudF9pZCI6IkFCMDAwMDEiLCJlbWFpbCI6ImhhcmlwcmFrYXNoLmJhYnVAb25laW50ZWdyYWwuY29tIiwib3JnYW5pemF0aW9uIjoiQUdTIEdyb3VwIiwiaWF0IjoxNjAzMjYwOTQ5LCJleHAiOjE2MDMzMDQxNDl9.vOklf3lT_gie_UN_RiEh35X-bQm_UtAUDkEde-qrOkg";

export const getTemplate = (query) => {
  return async (dispatch) => {
    dispatch(fetchGetTemplateRequest());
    try {
      const response = await axios({
        method: "POST",
        url: "https://audiresb.oneintegral.com/backend/api/lease/processTemplates",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: queryString.stringify({
          processName: query,
        }),
      });
      const data = response.data.data;
      dispatch(fetchGetTemplateSuccess(data));
        return data;
    } catch (error) {
      dispatch(fetchGetTemplateFailure(error));
    }
  };
};

export const fetchGetTemplateRequest = () => {
  return {
    type: FETCH_GET_TEMPLATE_REQUEST,
  };
};

export const fetchGetTemplateSuccess = (data) => {
  return {
    type: FETCH_GET_TEMPLATE_SUCCESS,
    payload: data,
  };
};

export const fetchGetTemplateFailure = (error) => {
  return {
    type: FETCH_GET_TEMPLATE_FAILURE,
    payload: error,
  };
};
