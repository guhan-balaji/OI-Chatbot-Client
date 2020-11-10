import {
  FETCH_CSV_UPLOAD_REQUEST,
  FETCH_CSV_UPLOAD_SUCCESS,
  FETCH_CSV_UPLOAD_FAILURE,
} from "./csvUploadTypes";

import axios from "axios";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjU5YzRiMTc0ZTExMzBiYjViMjA5ZWEiLCJ1c2VybmFtZSI6IkhhcmlzaCIsInRlbmFudF9pZCI6IkFCMDAwMDEiLCJlbWFpbCI6ImhhcmlwcmFrYXNoLmJhYnVAb25laW50ZWdyYWwuY29tIiwib3JnYW5pemF0aW9uIjoiQUdTIEdyb3VwIiwiaWF0IjoxNjAzMjYwOTQ5LCJleHAiOjE2MDMzMDQxNDl9.vOklf3lT_gie_UN_RiEh35X-bQm_UtAUDkEde-qrOkg";

export const csvUpload = (fileData) => {
  const formData = new FormData();
  formData.append("tenantId", "AB00001");
  formData.append("checkDuplicate", false);
  formData.append("system", "Audire");
  formData.append("file", fileData.file);

  return async (dispatch) => {
    dispatch(fetchCsvUploadRequest);
    try {
      const response = await axios.post(
        "https://audiresb.oneintegral.com/backend/api/lease/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      const fileName = await response.data.data.filename;
      const chResponse = await axios.post(
        "https://audiresb.oneintegral.com/backend/api/lease/checkHeaders",
        {
          tenantId: "AB00001",
          processName: fileData.processName,
          fileNames: fileName,
        }
      );
      const data = await chResponse.data.data.headers;
      dispatch(fetchCsvUploadSuccess({ fileName: fileName, data: data }));
    } catch (error) {
      dispatch(fetchCsvUploadFailure(error));
    }
  };
};

export const fetchCsvUploadRequest = () => {
  return {
    type: FETCH_CSV_UPLOAD_REQUEST,
  };
};

export const fetchCsvUploadSuccess = (data) => {
  return {
    type: FETCH_CSV_UPLOAD_SUCCESS,
    payload: data,
  };
};

export const fetchCsvUploadFailure = (error) => {
  return {
    type: FETCH_CSV_UPLOAD_FAILURE,
    payload: error,
  };
};
