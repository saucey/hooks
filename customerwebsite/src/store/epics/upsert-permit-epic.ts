import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators'
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { IAppError, IEpicDependency, IPurchase, IPermit, IProductFrequency, IPermitProduct } from'../../models';
import { upsertPermitSuccess, upsertPermitError, purchaseDataStateActions } from '../actions'; 
// import { routes } from '../../routes';
// import { appHistory } from '../../app-history';    
import { getClient } from '../../helpers';

const permitData = (permitId: number, purchase: IPurchase): IPermit => {

    let client = getClient();
    let startDate = purchase.startDate ? purchase.startDate.toDateString() : new Date().toDateString();//.toDate().toDateString(): new Date().toDateString();
    let endDate   = '';
    let requestCancellationDate  = '';
    let discountEndDate   = '';

    if(endDate === 'Invalid Date'){endDate = '';}
    if(requestCancellationDate === 'Invalid Date'){requestCancellationDate = '';}
    if(discountEndDate === 'Invalid Date'){discountEndDate = '';}
    let newFreq: IProductFrequency|null = purchase.frequency;
    let prod: IPermitProduct | null = {permitProductId:purchase.productId, permitProductName: purchase.productName, client: client, 
        spaces:0, activeVRMs:0, maxVRMs:0, startDate:'Fri Jan 25 2019', endDate:'', isVisibleToPublic:false, isActive:false,
        createdBy:1041, createdDate: new Date().toDateString(), updatedBy:1041,updatedDate: new Date().toDateString(),
        prices:[],sites:[],permits:[]}; //purchase.product ? form.product.field : null;
    if(prod !== null){
        prod.client = null;
        prod.prices = [];
        prod.sites = [];
        prod.permits = [];
        }
        return {
        permitId: permitId,
        product: prod,
        client: client,
        spaces: purchase.spaces,
        deposit: 0,
        bankAccountToken: purchase.bankAccountToken,
        cardPaymentToken: purchase.cardPaymentToken,
        startDate: startDate,
        endDate: endDate,
        requestedCancellationDate: requestCancellationDate,
        isActive: true,
        createdDate: new Date().toDateString(), 
        createdBy: 1041,
        updatedDate: new Date().toDateString(), 
        updatedBy: 1041,
        customer: purchase.customer ? purchase.customer : null,
        customerId: purchase.customer ? purchase.customer.customerId: null,
        productFrequency: purchase.frequency ? purchase.frequency: newFreq,
        permitProductPriceId: 0, 
        price: 0,
        discountPercentage: 0,
        discountEndDate: discountEndDate,
        balance: 0,
        vrms:purchase.VRMs ? purchase.VRMs : []
    }
};

export const upsertPermitEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
Observable<IAppAction> => action$.pipe(
    ofType(purchaseDataStateActions.UPSERT_PERMIT),
    mergeMap(({ payload }) => {
        const purchase = payload.purchase;
        const permitId = payload.permitId;
        const isNew = payload.isNew;
        let permit = permitData(permitId, {...purchase});
        let p = JSON.stringify(permit);
        return api.put(endPointKeys.base, `Permit/${permitId}`, p).pipe(
            map(res => res.data.data),
            map((permit: IPermit) => upsertPermitSuccess(permit, isNew)),
            catchError(error => {
                const appError: IAppError = { error, message:'Failed to save permit'};
                return of(upsertPermitError(appError));
            })        
        )
    })
);

export const upsertPermitSuccessEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
Observable<IAppAction> => action$.pipe(
    ofType(purchaseDataStateActions.UPSERT_PERMIT_SUCCESS),
    mergeMap( ({ payload }) => {
        // const permit = payload.permit;
        // appHistory().push(routes.permitEdit(permit.permitId.toString() ));
        return EMPTY;
    })
);  

export const upsertPermitVrmsEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
Observable<IAppAction> => action$.pipe(
    ofType(purchaseDataStateActions.UPSERT_PERMIT),
    mergeMap(({ payload }) => {
        const form = payload.permitForm;
        const permitId = payload.permitId;
        let permit = permitData(permitId, {...form});
        let p = JSON.stringify(permit);
        return api.put(endPointKeys.base, `Permit/${permitId}`, p).pipe(
            map(res => res.data.data),
            map((permit: IPermit) => upsertPermitSuccess(permit, true)),
            catchError(error => {
                const appError: IAppError = { error, message:'Failed to save product'};
                return of(upsertPermitError(appError));
            })        
        )
    })
);
