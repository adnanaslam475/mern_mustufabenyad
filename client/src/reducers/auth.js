let userState;

if (window.localStorage.getItem("auth")) {
  userState = JSON.parse(window.localStorage.getItem("auth"));
} else {
  userState = null; // {}
}

export const authReducer = (
  state = { name: "", role: "" },
  action
) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      // console.log()
      return { ...state, ...action.payload };
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};