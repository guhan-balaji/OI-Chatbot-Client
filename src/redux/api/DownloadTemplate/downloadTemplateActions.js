import {
  FETCH_DOWNLOAD_TEMPLATE_REQUEST,
  FETCH_DOWNLOAD_TEMPLATE_SUCCESS,
  FETCH_DOWNLOAD_TEMPLATE_FAILURE,
} from "./downloadTemplateTypes";

import axios from "axios";

export const downloadTemplate = (fileData) => {
  return async (dispatch) => {
    dispatch(fetchDownloadTemplateRequest());
    try {
      const response = await axios({
        method: "POST",
        url:
          "https://audiresb.oneintegral.com/backend/api/lease/downloadTemplate",
        responseType: "blob",
        data: {
          fileName: fileData.fileName,
          tenantId: "AB00001",
          system: "Audire",
        },
      });
      const blob = response.data.data;
      console.log(blob);
      dispatch(fetchDownloadTemplateSuccess(blob));
      return blob;
    } catch (error) {
      dispatch(fetchDownloadTemplateFailure(error));
    }
  };
};

export const fetchDownloadTemplateRequest = () => {
  return {
    type: FETCH_DOWNLOAD_TEMPLATE_REQUEST,
  };
};

export const fetchDownloadTemplateSuccess = (data) => {
  return {
    type: FETCH_DOWNLOAD_TEMPLATE_SUCCESS,
    payload: data,
  };
};

export const fetchDownloadTemplateFailure = (error) => {
  return {
    type: FETCH_DOWNLOAD_TEMPLATE_FAILURE,
    payload: error,
  };
};
