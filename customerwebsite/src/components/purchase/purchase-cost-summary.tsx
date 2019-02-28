import * as React from 'react'
import { IPurchase } from '../../models/purchase';
import { CenteredText, CenteredTextWithUnderline } from '../../styles';
import Moment from 'moment';
import { CostSummaryTable } from '../cost-summary-table';
import NumberFormat from 'react-number-format'

export interface IPurchaseSummaryProps {
    purchase:IPurchase;
}
    
export interface IPurchaseSummaryState {
};
    
export class PurchaseSummary extends React.Component<IPurchaseSummaryProps, IPurchaseSummaryState> {
    constructor(props: IPurchaseSummaryProps) {
        super(props);
        this.state = {};         
    }

render() {
    const {purchase} = this.props;
    const frequencyName: string = purchase.frequency.productFrequencyName;
    let totalPrice: number = purchase.frequency.price * purchase.spaces;
    const formattedStartDate:string = Moment(purchase.startDate).format('DD/MM/YYYY');
    return (
         <React.Fragment><br/>
            <CenteredText>{purchase.productName}</CenteredText>
            <CenteredText>{frequencyName} at £{purchase.frequency.price} x {purchase.spaces} {purchase.spaces>1?"spaces" : "space"} = 
                <NumberFormat value={totalPrice} decimalScale={2} fixedDecimalScale={true}  displayType={'text'} thousandSeparator={true} prefix={'£'} /></CenteredText>
            {frequencyName==="Annually" && <CenteredTextWithUnderline style={{whiteSpace: 'pre-wrap'}}>{`Your ${purchase.spaces>1?"permits" : 
                "permit"} will start on ${formattedStartDate} and end on ${formattedStartDate}`}</CenteredTextWithUnderline>}
            {(frequencyName==="Quarterly" || frequencyName==="Monthly") && 
            <CenteredTextWithUnderline>{`Your ${purchase.spaces>1?"permits" : "permit"} will start on ${formattedStartDate}`}</CenteredTextWithUnderline>}
            <br/>
            <CostSummaryTable purchase={purchase}/>
            <br/>
            <CenteredText style={{fontFamily:'Panton Narrow W00 Light Italic'}}>{frequencyName==="Monthly"?"Continue to enter bank account details":"Continue to enter card details for payment"}</CenteredText>
         </React.Fragment>
    )
}
}


