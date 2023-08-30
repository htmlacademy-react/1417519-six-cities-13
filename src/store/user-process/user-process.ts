import { createSlice } from '@reduxjs/toolkit';
import { NameSpace,AuthorizationStatus } from '../../consts';
import { UserProcess } from '../../types/state';
import { checkAuthAction,loginAction,logoutAction } from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus:AuthorizationStatus.Unknown,
  userData:null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(checkAuthAction.fulfilled, (state,action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state,action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.userData = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
