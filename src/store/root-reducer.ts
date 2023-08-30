import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { userProcess } from './user-process/user-process';
import { offersData } from './offers-data/offers-data';
import { reviews } from './reviews/reviews-data';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Reviews]: reviews.reducer,
});
