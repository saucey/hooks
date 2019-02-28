import { IClient, ICustomer, IPermitProduct, IProductFrequency } from '.';
import Moment from 'moment';
import { IVrm } from './vrm';

export interface IPermit
{
    permitId: number;
    customer : ICustomer | null;
    customerId: number | null;
    client : IClient | null;
    product : IPermitProduct | null;
    productFrequency: IProductFrequency | null;
    spaces: number;
    price: number;
    permitProductPriceId: number;
    requestedCancellationDate: any;
    deposit: number;
    bankAccountToken: string;
    cardPaymentToken: string;
    startDate : any;
    endDate : any;
    discountPercentage : number;
    discountEndDate : any;
    balance : number;
    isActive : boolean;
    createdBy : number;
    createdDate : any;
    updatedBy : number;
    updatedDate : any;
    vrms: Array<IVrm>;
}

export class Permit implements IPermit
{
    permitId: number;
    customer : ICustomer | null;
    customerId: number | null;
    client : IClient | null;
    product : IPermitProduct | null;
    productFrequency: IProductFrequency | null;
    spaces: number;
    price: number;
    permitProductPriceId: number;
    requestedCancellationDate: any;
    deposit: number;
    bankAccountToken: string;
    cardPaymentToken: string;
    startDate : any;
    endDate : any;
    discountPercentage : number;
    discountEndDate : any;
    balance : number;
    isActive : boolean;
    createdBy : number;
    createdDate : any;
    updatedBy : number;
    updatedDate : any;
    vrms: Array<IVrm>;

    constructor(){
        this.permitId = 0,
        this.customer = null,
        this.customerId = null,
        this.client = null,
        this.product = null,
        this.productFrequency = null,
        this.spaces = 1,
        this.price = 0,
        this.permitProductPriceId = 0,
        this.requestedCancellationDate = Moment().format('YYYY/MM/DD'),
        this.deposit = 0,
        this.bankAccountToken = '',
        this.cardPaymentToken = '',
        this.startDate = Moment().format('YYYY/MM/DD'),
        this.endDate = null,
        this.discountPercentage = 0,
        this.discountEndDate = null,
        this.balance = 0,
        this.isActive = true,
        this.createdBy = 0,
        this.createdDate = null,
        this.updatedBy = 0,
        this.updatedDate = null,
        this.vrms = []
    }
}