import { combineReducers } from "redux";
import selectAppReducer from "./SelectApp/saReducer";
import selectProcessReducer from "./SelectProcess/spReducer";
import fileDataReducer from "./FileData/fileDataReducer";
import dateFormReducer from "./DateForm/formReducer";
import dataLoadReducer from "./DataLoad/dlReducer";
import dialogflowReducer from "./api/Dialogflow/dialogflowReducer";
import processArrayReducer from "./api/ProcessArray/processArrayReducer";
import processDefnReducer from "./api/ProcessDefn/processDefnReducer";
import getTemplateReducer from "./api/GetTemplate/getTemplateReducer";
import downloadTemplateReducer from "./api/DownloadTemplate/downloadTemplateReducer";
import csvUploadReducer from "./api/CsvUpload/csvUploadReducer";

const rootReducer = combineReducers({
  selectApp: selectAppReducer,
  selectProcess: selectProcessReducer,
  fileData: fileDataReducer,
  dateForm: dateFormReducer,
  dataLoad: dataLoadReducer,
  dialogflow: dialogflowReducer,
  processArray: processArrayReducer,
  processDefn: processDefnReducer,
  getTemplate: getTemplateReducer,
  downloadTemplate: downloadTemplateReducer,
  csvUpload: csvUploadReducer,
});

export default rootReducer;
