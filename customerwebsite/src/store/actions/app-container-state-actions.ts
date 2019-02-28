import { IAppAction } from '../app-action';
import { IAppError, IAppUser } from '../../models';

export const appContainerStateActions = {
APP_INITIALIZE: 'APP_INITIALIZE',
AAD_LOGIN_SUCCESS: 'AAD_LOGIN_SUCCESS',
AAD_LOGOUT_SUCCESS: 'AAD_LOGOUT_SUCCESS',
APP_INITIALIZING: 'APP_INITIALIZING',
APP_INITIALIZED: 'APP_INITIALIZED',
APP_INITIALIZING_COMPLETE: 'APP_INITIALIZING_COMPLETE',
APP_NOT_YET_READY: 'APP_NOT_YET_READY',
APP_ERROR: 'APP_ERROR',
FETCH_USER: 'FETCH_USER',
FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
FETCH_USER_ERROR: 'FETCH_USER_ERROR',
SET_SIDE_MENU_VISIBILITY: 'SET_SIDE_MENU_VISIBILITY'
}

export const initialize = (userAuth:{userName: string, password: string }): IAppAction => ({
         type: appContainerStateActions.APP_INITIALIZE,
         payload: userAuth
});

export const loginSuccess = (data:string): IAppAction => ({
        type: appContainerStateActions.AAD_LOGIN_SUCCESS,
        payload: data
});

export const logoutSuccess = (): IAppAction => ({
        type: appContainerStateActions.AAD_LOGOUT_SUCCESS,
});

export const initializing = (token:string): IAppAction => ({
        type: appContainerStateActions.APP_INITIALIZING,
        payload: token
});

export const initialized = (): IAppAction => ({
        type: appContainerStateActions.APP_INITIALIZED
    });

export const initializingComplete = (): IAppAction => ({
        type: appContainerStateActions.APP_INITIALIZING_COMPLETE
    });

export const notYetReady = (): IAppAction => ({
            type: appContainerStateActions.APP_NOT_YET_READY
    });

export const setAppError = (appError: IAppError): IAppAction => ({
          type: appContainerStateActions.APP_ERROR,
          payload: appError
    });

export const fetchUser = (): IAppAction => ({
            type: appContainerStateActions.FETCH_USER
    });
        
export const fetchUserSuccess = (user: IAppUser): IAppAction => ({
            type: appContainerStateActions.FETCH_USER_SUCCESS,
           payload: user
    });
    
export const fetchUserError = (appError: IAppError): IAppAction => ({
           type: appContainerStateActions.FETCH_USER_ERROR,
           payload: appError
    });

export const setSideMenuVisibility = (open: boolean): IAppAction => ({
            type: appContainerStateActions.SET_SIDE_MENU_VISIBILITY,
            payload: open
    });