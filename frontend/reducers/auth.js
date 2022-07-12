export const loginReducer = (state = 0, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return 0;
    default:
      return state;
  }
};

export const loginStatusReducer = (state = false, action) => {
  switch (action.type) {
    case "LOGIN":
      return true;
    case "LOGOUT":
      return false;
    default:
      return state;
  }
};


export const bestAnswerUpdatedReducer = (state = false, action) => {
  switch (action.type) {
    case "BEST_ANSWER_UPDATED":
      return action.payload;
    default:
      return state;
  }
};
