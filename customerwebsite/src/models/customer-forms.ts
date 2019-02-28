import { IUser } from './misc/user';
import { ICountry, IClient } from '.';
import * as moment from 'moment';

export interface IFormField<T> {
field: T;
isValid?: boolean;
validationMessage?: string
}

export interface ICustomerForm {
customerName: IFormField<string>;   
client: IFormField<IClient | null>; 
addressLine1: IFormField<string>;
addressLine2: IFormField<string>;
town: IFormField<string>;
county: IFormField<string>;
postcode: IFormField<string>;
country: IFormField<ICountry | null>;
phoneNumber: IFormField<string>;
emailAddress: IFormField<string>;
createdBy: IFormField<IUser | null>;
createdDate: IFormField<moment.Moment | null>;
updatedBy: IFormField<IUser | null>;
updatedDate: IFormField<moment.Moment | null>;
}

export interface ICustomerEditForm {
customerName: IFormField<string>;   
client: IFormField<IClient | null>; 
addressLine1: IFormField<string>;
addressLine2: IFormField<string>;
town: IFormField<string>;
county: IFormField<string>;
postcode: IFormField<string>;
country: IFormField<ICountry | null>;
phoneNumber: IFormField<string>;
emailAddress: IFormField<string>;
notes: IFormField<string>;
}

