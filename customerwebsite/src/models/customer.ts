import { IClient, ICountry, IPermit } from '.'
//import { dateTimeHelper } from '../helpers';
import Moment from 'moment';

export interface ICustomer {
    customerId: number;
    customerName: string;
    client: IClient | null;
    addressLine1 : string;
    addressLine2 : string;
    town : string;
    county : string;
    postcode : string;
    country: ICountry | null;
    phoneNumber: string;
    emailAddress: string;
    notes: string;
    isActive: boolean;
    createdBy: number;
    createdDate: any;
    updatedBy: number;
    updatedDate: any;
    permits: Array<IPermit>;
}

export class Customer implements ICustomer {
    customerId: number;
    customerName: string;
    client: IClient | null;
    addressLine1 : string;
    addressLine2 : string;
    town : string;
    county : string;
    postcode : string;
    country: ICountry | null;
    phoneNumber: string;
    emailAddress: string;
    notes: string;
    isActive: boolean;
    createdBy: number;
    createdDate: any;
    updatedBy: number;
    updatedDate: any;
    permits: Array<IPermit>;

    constructor(){
        this.customerId = 0,
        this.customerName = '',
        this.client = null,
        this.addressLine1 = '',
        this.addressLine2 = '',
        this.town = '',
        this.postcode = '',
        this.county = '',
        this.country = {countryId:234, countryName:'United Kingdom'},
        this.phoneNumber = '',
        this.emailAddress = '',
        this.notes = '',
        this.isActive = true,
        this.createdBy = 0,
        this.createdDate = Moment().format('YYYY/MM/DD'),
        this.updatedBy = 0,
        this.updatedDate = Moment().format('YYYY/MM/DD'),
        this.permits = []
    }
}