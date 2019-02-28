import { IAppAction } from '../app-action';
import { IAppContainerState, getDefaultAppContainerState } from '../state';
import { appContainerStateActions } from '../actions';
import { newUser } from '../../models';
//import { IAppUser  } from '../../models';

const CLIENT_ID = `${process.env.REACT_APP_CLIENT_ID}`;
const CLIENT_NAME = `${process.env.REACT_APP_CLIENT_NAME}`;

const handlers = {
[appContainerStateActions.APP_INITIALIZE]: (state: IAppContainerState, payload: any): IAppContainerState => ({
...state, client:{clientId:parseInt(CLIENT_ID), clientName:CLIENT_NAME, shouldShowSites:false},
// user:{ 
// //    ...defaultUserState,...state.user,emailAddress:payload.emailAddress,token:payload.token 
// }, 
isReady: false
}),
[appContainerStateActions.APP_INITIALIZING]: (state: IAppContainerState, payload: any): IAppContainerState =>({
...state, user: {...newUser, token: payload? payload : '', isAuthenticated: payload? true : false},isReady: false }),
[appContainerStateActions.APP_INITIALIZED]: (state: IAppContainerState, payload: any): IAppContainerState =>({
...state, isReady: true }),
[appContainerStateActions.SET_SIDE_MENU_VISIBILITY]: (state: IAppContainerState, payload: any): IAppContainerState =>({
...state, isSideMenuOpen: payload }),

};

const appContainerReducer = (state: IAppContainerState = getDefaultAppContainerState(), action: IAppAction) => {
      return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action.payload): state;
};

export default appContainerReducer;