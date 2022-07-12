export const login = (user) => {
  return {
    type: "LOGIN",
    payload: user,
  };
};

export const bestAnswerUpdated = (flag) => {
  return {
    type: "BEST_ANSWER_UPDATED",
    payload: flag,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
