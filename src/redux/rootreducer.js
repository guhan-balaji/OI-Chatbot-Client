import { combineReducers } from "redux";
import dialogflowReducer from "./api/dialogflowAPI/dfReducer";
import selectAppReducer from "./SelectApp/saReducer";
import dateFormReducer from "./DateForm/formReducer";

const rootReducer = combineReducers({
  dialogflow: dialogflowReducer,
  selectApp: selectAppReducer,
  dateForm: dateFormReducer,
});

export default rootReducer;
