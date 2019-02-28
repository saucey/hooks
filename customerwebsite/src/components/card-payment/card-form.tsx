import * as React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { IPurchase } from '../../models';
// import { PaymentRequestForm } from './payment-request-form';

const createOptions = (fontSize) => {
    return {
      style: {
        base: { fontSize, color: 'RGB(225,225,225)', letterSpacing: '0.025em', fontFamily: "Panton W01 Light", 
        '::placeholder': { color: 'RGB(225,225,225)', fontFamily:'Panton W01 Light'}},
        invalid: { color: 'red',},
      },
    };
  };
//4000 0082 6000 0000
  export interface ICardFormProps{
      stripe: any;
      fontSize: string;
      purchase:IPurchase;
  }

// var stripe = stripe('pk_test_Lq0aD6djsm4pANJItCXGOk2m');

export class _CardForm extends React.Component<ICardFormProps> {
    constructor(props:ICardFormProps){
        super(props);
    }

    handleSubmit = (ev) => {
      ev.preventDefault();
      if (this.props.stripe) { this.props.stripe.createToken().then((payload) => console.log('[token]', payload));
      } else { console.log("Stripe.js hasn't loaded yet.");}
    };
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <CardElement onBlur={handleBlur} onChange={handleChange} onFocus={handleFocus} onReady={handleReady} {...createOptions(this.props.fontSize)}/>
            {/* <PaymentRequestForm purchase={this.props.purchase} stripe={injectStripe}></PaymentRequestForm> */}
        </form>
      );
    }
  }
  export const CardForm = injectStripe(_CardForm);

  const handleBlur = () => {
    console.log('[blur]');
  };
  const handleChange = (change) => {
    console.log('[change]', change);
  };
  const handleFocus = () => {
    console.log('[focus]');
  };
  const handleReady = () => {
    console.log('[ready]');
  };