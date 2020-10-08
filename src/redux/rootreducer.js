import { combineReducers } from "redux";
import dialogflowReducer from "./api/dialogflowAPI/dfReducer";
import selectAppReducer from "./SelectApp/saReducer";

const rootReducer = combineReducers({
  dialogflow: dialogflowReducer,
  selectApp: selectAppReducer,
});

export default rootReducer;