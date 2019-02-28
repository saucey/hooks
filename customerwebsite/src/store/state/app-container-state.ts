import { IAppError, IAppUser, IClient } from '../../models'

export interface IAppContainerState {
  client: IClient | null;
  isReady : boolean;
  appError?: IAppError | null;
  isSideMenuOpen: boolean;
  user: IAppUser | null;
}

const defaultState: IAppContainerState = {
    client:null,
    isReady: false,
    appError: null,
    isSideMenuOpen: true,
    user: null
}

// export const defaultUserState: IAppUser = { 
//   userId: 0, 
//   userName:'', 
//   displayName:'', 
//   emailAddress: '', 
//   token:'' 
// };

export const getDefaultAppContainerState = (options?: any) => { return {...defaultState,...options }; };