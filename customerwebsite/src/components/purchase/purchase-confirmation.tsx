import * as React from 'react'
import { IPurchase } from '../../models/purchase';
import { CenteredText, VerticalSpacer5 } from '../../styles/style';
import {Link} from 'react-router-dom'
import Moment from 'moment'
import { dateTimeHelper } from '../../helpers';
import { purchaseCalculator } from '../../helpers/purchase-calculator';
import { IPermit } from '../../models';
import NumberFormat from 'react-number-format';

export interface IPurchaseConfirmationProps {
    purchase:IPurchase;
    permit:IPermit | null;
}
    
export interface IPurchaseConfirmationState {
};
    
export class PurchaseConfirmation extends React.Component<IPurchaseConfirmationProps, IPurchaseConfirmationState> {
    constructor(props: IPurchaseConfirmationProps) {
        super(props);
        this.state = {};         
}

render() {
    const {purchase, permit} = this.props;
    const productFrequencyName = purchase.frequency.productFrequencyName;
    let priceForAllSpaces: number = purchase.frequency.price * purchase.spaces;
    const priceUntilStartofNextMonth: number = purchaseCalculator.priceUntilStartofNextMonth(priceForAllSpaces, purchase.startDate);
    const formattedStartDate:string = Moment(purchase.startDate).format('DD/MM/YYYY');
    const formattedEndDate: string = dateTimeHelper.getEndDateForPeriodAsDate(purchase.startDate, purchase.frequency.productFrequencyName);

    const deposit:number = purchaseCalculator.getDepositAmount(priceForAllSpaces, purchase.frequency.productFrequencyName);
    const formattedPrice: number = productFrequencyName === "Monthly"? priceUntilStartofNextMonth : priceForAllSpaces;
    const grandTotal: number = Math.round((deposit + formattedPrice)*100)/100;
    return (
         <div>
        <VerticalSpacer5/>
         <CenteredText>Thank you for your purchase.  You will receive a confirmation email shortly.</CenteredText>
         {permit && <CenteredText>Your permit reference number is {permit.permitId}.</CenteredText>}
         <CenteredText>You have just paid <NumberFormat value={grandTotal} decimalScale={2} fixedDecimalScale={true}  displayType={'text'} thousandSeparator={true} prefix={'£'} />.</CenteredText>
         <CenteredText>{purchase.frequency.productFrequencyName!=="Monthly"? `Your permit will start on ${formattedStartDate} and end on ${formattedEndDate}.`:
            `Your permit will start on ${formattedStartDate} and will renew each month.`}</CenteredText>
         <CenteredText>To manage your permit, please go to the <Link to="" style={{color:'white', textDecoration: 'underline' }}>Manage your Permits</Link> section.</CenteredText>
         <br/>
         </div>
    )
}
}


