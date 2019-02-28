import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { of, concat, Observable } from 'rxjs';
import { map, flatMap, mergeMap, catchError } from 'rxjs/operators';
import { IAppAction } from '../app-action'; 
import { IAppState } from '../state';
import { appContainerStateActions, referenceDataStateActions,initialized, initializing, fetchRefDataProductFrequencies, fetchRefDataSiteTownsForClient, fetchRefDataClients
} from '../actions';
import { IEpicDependency } from '../../models';

// const API_USER =`${process.env.REACT_APP_API_USERNAME}`;
// const PASSWORD =`${process.env.REACT_APP_API_PASSWORD}`;

// export const appPreInitializeEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, {api, endPointKeys}: IEpicDependency): Observable<IAppAction> => action$.pipe(
//     ofType(appContainerStateActions.APP_PREINITIALIZE),
//     flatMap(() => {
//            return concat(of(setClient(parseInt(CLIENT_ID))),
//                          of(initialize({userName:API_USER,password:PASSWORD}))
//         );
// }));

export const appInitializeEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, {api, endPointKeys}: IEpicDependency): Observable<IAppAction> => action$.pipe(
        ofType(appContainerStateActions.APP_INITIALIZE),
        mergeMap(({ payload }) => {
            let a = JSON.stringify(payload);
            return api.post(endPointKeys.base, 'Authorise', a).pipe(
                map(res => res.data),
                map((token: string) => initializing(token)),
                catchError(error => {
                    //const appError: IAppError = { error, message:'Failed to get authorisation from the API'};
                    return of(initializing(''))
            })
            );
}));



export const appInitializingEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, {api}) => action$.pipe(
ofType(appContainerStateActions.APP_INITIALIZING),
flatMap(() => {
return concat(
    of(fetchRefDataClients()),
    of(fetchRefDataProductFrequencies()),
    of(fetchRefDataSiteTownsForClient()),
        )
    })
);

export const appInitializedEpic = (action$: ActionsObservable<IAppAction>, state$: IAppState, {api}) => action$.pipe(
ofType(
referenceDataStateActions.FETCH_REF_DATA_CLIENTS_SUCCESS
),
flatMap(() => {
//const state: IAppState = store.getState();
//const { regions, countries } = state.referenceData;
 //if (regions.length === 0 || countries.length === 0) {
//       return Observable.concat(Observable.of(notYetReady()));
// }
return concat(
    of(initialized())
)
}));
