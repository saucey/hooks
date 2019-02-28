import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { IAppError, IEpicDependency, ICustomer, ICustomerEditForm } from '../../models';
import { upsertCustomerSuccess, upsertCustomerError, purchaseDataStateActions } from '../actions';
import { appHistory } from '../../app-history';
import { routes } from '../../routes';

const customerData = (customerId: number, form: ICustomerEditForm): ICustomer => {
    let client = form.client && form.client.field ? {
        clientId: form.client.field.clientId,
        clientName: form.client.field.clientName,
        shouldShowSites: form.client.field.shouldShowSites }: null;
    let country = form.country && form.country.field ? {
        countryId: form.country.field.countryId,
        countryName: form.country.field.countryName }: null;

    return {
        customerId: customerId, 
        //firstName
        //lastName
        //company
        customerName: form.customerName.field,
        client: client,
        addressLine1: form.addressLine1.field,
        addressLine2: form.addressLine2.field,
        town: form.town.field,
        county: form.county.field,
        postcode: form.postcode.field,
        country: country,
        phoneNumber: form.phoneNumber.field,
        emailAddress: form.emailAddress.field,
        //password
        notes: form.notes.field,
        isActive: true,
        createdDate: new Date().toDateString(), 
        createdBy: 11,
        updatedDate: new Date().toDateString(), 
        updatedBy: 10,
        permits: []
    }
};

export const upsertCustomerEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
Observable<IAppAction> => action$.pipe(
    ofType(purchaseDataStateActions.UPSERT_CUSTOMER),
    mergeMap(({ payload }) => {
        const form = payload.customerForm;
        const customerId = payload.customerId;
        let customer = customerData(customerId, {...form});
        //let data = new FormData();
        let c = JSON.stringify(customer);
        //data.append('customer', JSON.stringify(customer));
        return api.put(endPointKeys.base, `Customer/${customerId}`, c).pipe(
            map(res => res.data.data),
            map((customer: ICustomer) => upsertCustomerSuccess(customer)),
            catchError(error => {
                const appError: IAppError = { error, message:'Failed to save customer'};
                return of(upsertCustomerError(appError));
            })        
        )
    })
);

export const upsertCustomerSuccessEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
Observable<IAppAction> => action$.pipe(
    ofType(purchaseDataStateActions.UPSERT_CUSTOMER_SUCCESS),
    mergeMap( ({ payload }) => {
        const customer = payload;
        appHistory().push(routes.customerEdit(customer.customerId.toString() ));
        return EMPTY;
    })
);
