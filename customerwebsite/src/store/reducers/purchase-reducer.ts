import { IAppAction } from '../app-action';
import { IPurchaseState, getDefaultPurchaseDataState } from '../state';
import { purchaseDataStateActions } from '../actions';

const handlers = {

    [purchaseDataStateActions.FETCH_SITES_FOR_CLIENT_BY_LOCATION]: (state: IPurchaseState, payload: any): IPurchaseState => {
        return { ...state, siteLocationSearch: [], isProcessing: true  }; 
    },
    [purchaseDataStateActions.FETCH_SITES_FOR_CLIENT_BY_LOCATION_SUCCESS]: (state: IPurchaseState, payload: any): IPurchaseState => {
        return { ...state, siteLocationSearch: payload, isProcessing: false }; 
    },
    [purchaseDataStateActions.FETCH_SITES_FOR_CLIENT_BY_LOCATION_ERROR]: (state: IPurchaseState, payload: any): IPurchaseState => {
        return { ...state, siteLocationSearch: [], isProcessing: false}; 
    },

    [purchaseDataStateActions.FETCH_PERMIT_PRODUCTS_FOR_SITE]: (state: IPurchaseState, payload: any): IPurchaseState => {
           return { ...state, products:[], isProcessing: true }; 
        },
    [purchaseDataStateActions.FETCH_PERMIT_PRODUCTS_FOR_SITE_SUCCESS]: (state: IPurchaseState, payload: any): IPurchaseState => {
        return { ...state, products: payload, isProcessing: false }; 
        },
    [purchaseDataStateActions.FETCH_PERMIT_PRODUCTS_FOR_SITE_ERROR]: (state: IPurchaseState, payload: any): IPurchaseState => {
        return { ...state, products:[], isProcessing: true }; 
        },
    [purchaseDataStateActions.CLEAR_PRODUCTS_FOR_SITE]: (state: IPurchaseState, payload: any): IPurchaseState => {
        return { ...state, products:[] }; 
        },

    [purchaseDataStateActions.FETCH_PERMIT_PRODUCT]: (state: IPurchaseState, payload: any): IPurchaseState => {
        return { ...state, product:null, isProcessing: true }; 
        },
    [purchaseDataStateActions.FETCH_PERMIT_PRODUCT_SUCCESS]: (state: IPurchaseState, payload: any): IPurchaseState => {
        return { ...state, product: payload, isProcessing: false }; 
        },
    [purchaseDataStateActions.FETCH_PERMIT_PRODUCT_ERROR]: (state: IPurchaseState, payload: any): IPurchaseState => {
        return { ...state, product:null, isProcessing: false }; 
        },

    [purchaseDataStateActions.FETCH_CUSTOMER]: (state: IPurchaseState, payload: any): IPurchaseState => {
        return { ...state, customer: null, isProcessing: true  }; 
        },
    [purchaseDataStateActions.FETCH_CUSTOMER_SUCCESS]: (state: IPurchaseState, payload: any): IPurchaseState => {
        return { ...state, customer: payload,  isProcessing: false  }; 
        },
    [purchaseDataStateActions.FETCH_CUSTOMER_ERROR]: (state: IPurchaseState, payload: any): IPurchaseState => {
        return { ...state, customer: null,  isProcessing: false  }; 
        },
        
    [purchaseDataStateActions.UPSERT_CUSTOMER]: (state: IPurchaseState, payload: any): IPurchaseState => {
            return { ...state, isProcessing: true  }; 
        },
    [purchaseDataStateActions.UPSERT_CUSTOMER_SUCCESS]: (state: IPurchaseState, payload: any): IPurchaseState => {
            return { ...state, customer: payload,  isProcessing: false  }; 
        },
    [purchaseDataStateActions.UPSERT_CUSTOMER_ERROR]: (state: IPurchaseState, payload: any): IPurchaseState => {
            return { ...state, customer: null,  isProcessing: false  }; 
        },

    [purchaseDataStateActions.NEW_CUSTOMER]: (state: IPurchaseState, payload: any): IPurchaseState => {
            return { ...state, customer:payload, isProcessing: true  }; 
        },

    [purchaseDataStateActions.UPSERT_PERMIT]: (state: IPurchaseState, payload: any): IPurchaseState => {
            return { ...state, permit:null, isProcessing: true}; 
    },
    [purchaseDataStateActions.UPSERT_PERMIT_SUCCESS]: (state: IPurchaseState, payload: any): IPurchaseState => {
             return { ...state, permit: payload.permit, isProcessing: false}; 
        },
    [purchaseDataStateActions.UPSERT_PERMIT_ERROR]: (state: IPurchaseState, payload: any): IPurchaseState => {
             return { ...state, permit:null, isProcessing: false }; 
        },

    }

const purchaseReducer = (state: IPurchaseState = getDefaultPurchaseDataState(), action: IAppAction) => {
      return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action.payload): state;
};

export default purchaseReducer;