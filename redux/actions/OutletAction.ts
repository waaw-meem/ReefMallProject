const OutletAction = {
  GetBrand: (state: any, action: any) => {
    state.brand = action.payload;
  },
};

export default OutletAction;
