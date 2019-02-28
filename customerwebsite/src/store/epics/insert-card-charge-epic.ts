import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { IAppError, IEpicDependency, IPayment } from '../../models';
import { paymentDataStateActions, insertCardChargeSuccess, insertCardChargeError } from '../actions';
// import { appHistory } from '../../app-history';
// import { routes } from '../../routes';

export const insertCardChargeEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
Observable<IAppAction> => action$.pipe(
    ofType(paymentDataStateActions.INSERT_CARD_CHARGE),
    mergeMap(({ payload }) => {
        const payment = payload.payment;
        const customerId = payload.customerId;
        //let customer = customerData(customerId, {...form});
        //let data = new FormData();
        let p = JSON.stringify(payment);
        //data.append('customer', JSON.stringify(customer));
        return api.put(endPointKeys.base, `Payment/${customerId}`, p).pipe(
            map(res => res.data.data),
            map((payment: IPayment) => insertCardChargeSuccess(payment)),
            catchError(error => {
                const appError: IAppError = { error, message:'Unable to make payment'};
                return of(insertCardChargeError(appError));
            })        
        )
    })
);

// export const upsertCustomerSuccessEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
// Observable<IAppAction> => action$.pipe(
//     ofType(purchaseDataStateActions.UPSERT_CUSTOMER_SUCCESS),
//     mergeMap( ({ payload }) => {
//         const customer = payload;
//         appHistory().push(routes.customerEdit(customer.customerId.toString() ));
//         return EMPTY;
//     })
// );
