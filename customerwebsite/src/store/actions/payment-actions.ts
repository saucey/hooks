import { IAppAction } from '../app-action';
import { IAppError, IPayment } from '../../models';

export const paymentDataStateActions = {

INSERT_CARD_CHARGE: 'INSERT_CARD_CHARGE',
INSERT_CARD_CHARGE_SUCCESS: 'INSERT_CARD_CHARGE_SUCCESS',
INSERT_CARD_CHARGE_ERROR: 'INSERT_CARD_CHARGE_ERROR',
}

export const insertCardCharge = (charge: IPayment, customerId: number): IAppAction => ({
    type: paymentDataStateActions.INSERT_CARD_CHARGE,
    payload: charge
});

export const insertCardChargeSuccess = (charge: IPayment): IAppAction => ({
    type: paymentDataStateActions.INSERT_CARD_CHARGE_SUCCESS,
    payload: charge
 });
    
 export const insertCardChargeError = (appError: IAppError): IAppAction => ({
    type: paymentDataStateActions.INSERT_CARD_CHARGE_ERROR,
    payload: appError
});

