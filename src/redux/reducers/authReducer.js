const storedUser = localStorage.getItem("cineviaUser");
const storedAuth = localStorage.getItem("cineviaAuth");

const initialState = {
  isAuthenticated: storedAuth === "true",
  user: storedAuth === "true" && storedUser ? JSON.parse(storedUser) : null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
