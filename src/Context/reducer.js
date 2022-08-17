import combineReducers from "../utils/combineReducers";

import notificationReducer from "./Notification/reducer";

const reducer = combineReducers({ notification: notificationReducer });

export default reducer;
