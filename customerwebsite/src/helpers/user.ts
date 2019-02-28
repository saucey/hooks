import { IAppUser } from '../models';
import { store } from '../store';
import { IAppState } from '../store/state';

export const user = (): IAppUser => {
    let state: IAppState = store.getState() as IAppState;
    return state.appContainer.user ? state.appContainer.user: defaultUser;
};

export const defaultUser: IAppUser = { 
    userId: 0, 
    userName:'', 
    displayName:'', 
    emailAddress: '', 
    isAuthenticated: false,
    token:'' 
  };