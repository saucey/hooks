import glamorous from "glamorous";
import React from "react";
import { CardForm, PaymentRequestForm } from ".";
import { Elements } from 'react-stripe-elements'
import { VerticalSpacer5, PayButton } from "../../styles/style";
import { IPurchase } from "../../models";


export const CheckoutDiv = glamorous.div({margin: '0 auto', fontFamily:'Panton W01 Light', width:400,maxWidth: 800, boxSizing: 'border-box', padding: '0 5px'});

export interface ICheckoutProps{
  purchase:IPurchase;
  buyPermit():void;
}

export interface ICheckoutState{
    elementFontSize:string;
}

const url = `https://staticresource.blob.core.windows.net/fonts/1519110/86377c61-f730-4059-8764-41ea8a511df9.woff`;
const font = [{family: 'Panton W01 Light', src: `url(${url})`}];

export class Checkout extends React.Component<ICheckoutProps,ICheckoutState> {
    constructor(props:ICheckoutProps) {
      super(props);
      this.state = { elementFontSize: window.innerWidth < 450 ? '14px' : '20px',};
      window.addEventListener('resize', () => {
        if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') { this.setState({elementFontSize: '14px'});
        } else if ( window.innerWidth >= 450 && this.state.elementFontSize !== '20px') { this.setState({elementFontSize: '20px'});}
      });
    }
  
    render() {
      const {purchase} = this.props;
      const {elementFontSize} = this.state;
      return (
        <CheckoutDiv>
          <VerticalSpacer5/>
          <Elements fonts={font}>
            <CardForm purchase={purchase} fontSize={elementFontSize} />
          </Elements>
          <Elements>
            <PaymentRequestForm purchase={purchase}/>
          </Elements>
          <VerticalSpacer5/>
          <PayButton onClick={() => this.props.buyPermit()}/>
        </CheckoutDiv>
      );
    }
  }