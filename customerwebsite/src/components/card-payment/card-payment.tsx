import * as React from 'react'
import { StripeProvider } from 'react-stripe-elements'
import { Checkout } from '.';
import { IPurchase } from '../../models';

export interface ICardPaymentProps{
  purchase: IPurchase;
  buyPermit():void;
}

export interface ICardPaymentState{
}

export class CardPayment extends React.Component<ICardPaymentProps, ICardPaymentState>{
    constructor(props: ICardPaymentProps) {
        super(props); 
        this.state = {};
}

render(){
const {purchase} = this.props;
return (
    <StripeProvider apiKey="pk_test_Lq0aD6djsm4pANJItCXGOk2m">
      <Checkout purchase={purchase} buyPermit={this.props.buyPermit}/>
    </StripeProvider>
);
      }
    }


