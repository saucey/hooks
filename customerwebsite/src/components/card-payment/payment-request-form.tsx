import * as React from 'react'
import { injectStripe, PaymentRequestButtonElement } from 'react-stripe-elements'
import { IPurchase } from '../../models';

export interface IPaymentRequestFormProps {
    purchase:IPurchase;
    stripe:any;
}

export interface IPaymentRequestFormState {
    canMakePayment: boolean;
    paymentRequest: any;
}

export class _PaymentRequestForm extends React.Component<IPaymentRequestFormProps,IPaymentRequestFormState> {
    constructor(props:IPaymentRequestFormProps) {
      super(props);
      // For full documentation of the available paymentRequest options, see: https://stripe.com/docs/stripe.js#the-payment-request-object
      const paymentRequest = props.stripe.paymentRequest(
        { country: 'GB', currency: 'gbp', total: { label: 'Demo total', amount: this.props.purchase.spaces, }, });
      paymentRequest.on('token', ({complete, token, ...data}) => {
        console.log('Received Stripe token: ', token);
        console.log('Received customer information: ', data);
        complete('success');
      });
      paymentRequest.canMakePayment().then((result) => { this.setState({canMakePayment: !!result});});
      this.state = { canMakePayment: false, paymentRequest,};
    }
  
    render() {
      return this.state.canMakePayment ? (
        <PaymentRequestButtonElement paymentRequest={this.state.paymentRequest} className="PaymentRequestButton"
          style={{
            // For more details on how to style the Payment Request Button, see: https://stripe.com/docs/elements/payment-request-button#styling-the-element
            paymentRequestButton: { theme: 'light', height: '64px', },
          }}
        />
      ) : null;
    }
  }

  export const PaymentRequestForm = injectStripe(_PaymentRequestForm);