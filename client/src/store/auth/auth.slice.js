import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { loadCurrentUser, login, logout, register } from './auth.actions';

const initialState = {
  user: null,
  dataStatus: DataStatus.IDLE,
  error: null
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(logout.fulfilled, state => {
      state.user = null;
    })
    .addMatcher(isAnyOf(login.pending, register.pending), state => {
      state.dataStatus = DataStatus.PENDING;
    })
    .addMatcher(
      isAnyOf(login.fulfilled, register.fulfilled, loadCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      }
    )
    .addMatcher(
      isAnyOf(login.rejected, logout.rejected, register.rejected, loadCurrentUser.rejected),
      (state, action) => {
        state.user = null;
        state.error = action.payload;
        state.dataStatus = DataStatus.REJECTED;
      }
    );
});

export { reducer };
