const UserAction = {
  LogIn: (state: any, action: any) => {
    // console.log(action.payload);
    // const {data} = action.payload;
    state.User = action.payload;
  },
  SignUp: (state: any, action: any) => {
    const { data } = action.payload;
    state.User = data;
  },
  Reset: (state: any, action: any) => {
    // const {data} = action.payload;
    state.Email = action.payload;
  },
};

export default UserAction;
