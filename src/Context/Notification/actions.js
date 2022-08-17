const ACTION_TYPES = {
  CLEAR_NOTIFICATION: "CLEAR_NOTIFICATION",
  SHOW_NOTIFICATION: "SHOW_NOTIFICATION",
};

export const clearNotification = () => {
  return { type: ACTION_TYPES.CLEAR_NOTIFICATION };
};

export const showNotification = (data) => {
  return {
    type: ACTION_TYPES.SHOW_NOTIFICATION,
    payload: { ...data },
  };
};

export default ACTION_TYPES;
