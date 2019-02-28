export interface IPayment
{
    id: number;
    tokenId : number | null;
    sourceId: number | null;
    description: string;
    amount : number;
    currency: string;
}

export class Payment implements IPayment
{
    id: number;
    tokenId : number | null;
    sourceId: number | null;
    description: string;
    amount : number;
    currency: string;

    constructor(){
        this.id = 0,
        this.tokenId = null,
        this.sourceId = null,
        this.description = '',
        this.amount = 0,
        this.currency = 'gbp'
    }
}