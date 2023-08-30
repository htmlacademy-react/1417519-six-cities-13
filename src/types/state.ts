import { store } from '../store';
import { AuthorizationStatus } from '../consts';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;
