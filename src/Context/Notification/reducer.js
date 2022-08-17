import ACTION_TYPES from "./actions";

const initialState = { active: false, data: null };

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.CLEAR_NOTIFICATION:
      return { active: false };
    case ACTION_TYPES.SHOW_NOTIFICATION:
      return { active: true, data: { ...payload } };
    default:
      return state;
  }
};

export default notificationReducer;
