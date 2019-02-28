import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { ISiteLookup, IAppError, IEpicDependency} from'../../models';
import { purchaseDataStateActions, fetchSitesForClientByLocationSuccess, fetchSitesForClientByLocationError} from '../actions';

export const fetchSitesForClientByLocationEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api,
endPointKeys }: IEpicDependency): Observable<IAppAction> => action$.pipe(
ofType(purchaseDataStateActions.FETCH_SITES_FOR_CLIENT_BY_LOCATION),
mergeMap(({ payload }) => {
    return api.get(endPointKeys.base, `site?clientId=${payload.clientId}&searchText=${payload.searchText}
    &latitude=${payload.latitude}&longitude=${payload.longitude}&town=${payload.town}&pageSize=${payload.pageSize}`).pipe(
        map(res => res.data.data),
        map((sites: Array<ISiteLookup>) => fetchSitesForClientByLocationSuccess(sites)),
        catchError(error => {
        const appError: IAppError = { error, message:'Failed to retrieve sites' };
        return of(fetchSitesForClientByLocationError(appError))
        })
  )})
);