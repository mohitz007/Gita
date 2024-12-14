import { combineReducers } from "redux";
import gita_action_reducer from "./gita_action_reducer";
import gita_additional_data_reducer from "./gita_additional_data_reducer";





export default combineReducers({
    gita_action_reducer,
    gita_additional_data_reducer,
})