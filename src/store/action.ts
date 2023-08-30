import {createAction} from '@reduxjs/toolkit';
import { AppRoute } from '../consts';

export const changeCity = createAction(
  'main/changeCity',
  (city:string | undefined) => ({payload: city})
);


export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');

