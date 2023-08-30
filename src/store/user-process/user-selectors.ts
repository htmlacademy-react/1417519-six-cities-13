import { AuthorizationStatus, NameSpace } from '../../consts';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';


export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getUserData = (state: Pick<State, NameSpace.User>): UserData | null => state[NameSpace.User].userData;

