const initialState = {
  isLoggedIn: false,
  userData: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload
      };
    case 'LOGOUT_USER':
      return initialState;
    default:
      return state;
  }
};

export default userReducer;