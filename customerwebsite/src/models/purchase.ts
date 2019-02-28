import { ISiteLookup } from "./site";
import { IProductFrequency } from "./frequency";
import { IVrm } from "./vrm";
import { ICustomer, ITown } from ".";

export interface IPurchase
{
    customer: ICustomer | null;
    town: ITown | null;
    site: ISiteLookup;
    productId: number;
    productName: string;
    discountPercentage:number;
    discountEndDate: Date | null;
    activeVRMs: number;
    maxVRMs: number;
    frequency: IProductFrequency | null;
    spaces: number;
    VRMs: Array<IVrm>;
    startDate: Date | null;
    bankAccountToken: string | null;
    cardPaymentToken: string | null;
}

export class Purchase implements IPurchase
{
    customer: ICustomer | null;
    town: ITown | null;
    site: ISiteLookup;
    productId: number;
    productName: string;
    discountPercentage:number;
    discountEndDate: Date | null;
    activeVRMs: number;
    maxVRMs: number;
    frequency: IProductFrequency | null;
    spaces: number;
    VRMs: Array<IVrm>;
    startDate: Date | null;
    bankAccountToken: string | null;
    cardPaymentToken: string | null;

    constructor(){
        this.customer = null,
        this.town = null,
        this.site = {siteId: 0, siteName:'', addressLine1:'', town:'', client:{clientId:0, clientName:'', shouldShowSites:false}, latitude:0,longitude:0},
        this.productId = 0,
        this.productName = '',
        this.discountPercentage = 0,
        this.discountEndDate = null,
        this.activeVRMs = 0,
        this.maxVRMs = 0,
        this.frequency = null,
        this.spaces = 1,
        this.VRMs = [],
        this.startDate = null,
        this.bankAccountToken = null,
        this.cardPaymentToken = null
    }

}