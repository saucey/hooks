import { IPermitProduct, ISiteLookup, ICustomer, IPermit } from '../../models'

export interface IPurchaseState {
  customer: ICustomer | null;
  siteLocationSearch: Array<ISiteLookup>;
  products : Array<IPermitProduct>;
  product: IPermitProduct | null;
  permit: IPermit | null;
  isProcessing: boolean;
}

const defaultState: IPurchaseState = {
    customer: null,
    siteLocationSearch: [],
    products: [],
    product: null,
    permit: null,
    isProcessing: false
}

export const getDefaultPurchaseDataState = (options?: any) => { return {...defaultState,...options }; };