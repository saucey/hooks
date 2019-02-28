import * as React from 'react'
import { IPurchase } from '../../models/purchase';
import { CardPayment } from '../card-payment';

export interface IPurchaseCardPaymentProps {
    purchase:IPurchase;
    buyPermit():void;
}
    
export interface IPurchaseCardPaymentState {
};
    
export class PurchaseCardPayment extends React.Component<IPurchaseCardPaymentProps, IPurchaseCardPaymentState> {
    constructor(props: IPurchaseCardPaymentProps) {
        super(props);
        this.state = {};         
    }

render() {
    const {purchase} = this.props;
    return (
         <div style={{margin:'0 auto'}}>
             <CardPayment purchase={purchase} buyPermit={this.props.buyPermit}/>
         </div>
    )}
}


