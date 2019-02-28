import * as React from 'react'
import { IPurchase } from '../models/purchase';
import { TableRowDescription, TableRowAmount, TableHeader, TableRow, Table } from '../styles';
import { dateTimeHelper } from '../helpers';
import Moment from 'moment';
import { purchaseCalculator } from '../helpers/purchase-calculator';
var NumberFormat = require('react-number-format');

export interface ICardPaymentSummaryProps
{
    purchase: IPurchase;
}

export class CostSummaryTable extends React.Component<ICardPaymentSummaryProps>{
    constructor(props: ICardPaymentSummaryProps) {
        super(props); 
}

render(){
    const {purchase} = this.props;
    const productFrequencyName: string = purchase.frequency.productFrequencyName;
    let priceForAllSpaces: number = purchase.frequency.price * purchase.spaces;
    const priceUntilStartofNextMonth: number = purchaseCalculator.priceUntilStartofNextMonth(priceForAllSpaces, purchase.startDate);

    const formattedStartOfNextMonth:string = dateTimeHelper.getStartOfNextMonthAsDate(purchase.startDate);
    const formattedStartDate:string = Moment(purchase.startDate).format('DD/MM/YYYY');
    const formattedEndDate: string = dateTimeHelper.getEndDateForPeriodAsDate(purchase.startDate, purchase.frequency.productFrequencyName);
    const formattedPartialPayment: string = productFrequencyName === "Monthly"? 
    `Period from ${formattedStartDate} to end of the ${purchase.frequency.productFrequencyPeriodName}`:`Period from ${formattedStartDate} to ${formattedEndDate}`;

    const deposit:number = purchaseCalculator.getDepositAmount(priceForAllSpaces, purchase.frequency.productFrequencyName);
    const formattedPrice: number = productFrequencyName === "Monthly"? priceUntilStartofNextMonth : priceForAllSpaces;
    const grandTotal: number = Math.round((deposit + formattedPrice)*100)/100;

return (
<React.Fragment>
<TableHeader>Card Payment</TableHeader>
<Table><tbody>
<TableRow>
    <TableRowDescription>Deposit of one month</TableRowDescription>
    <TableRowAmount><NumberFormat value={deposit} decimalScale={2} fixedDecimalScale={true}  displayType={'text'} thousandSeparator={true} prefix={'£'} /></TableRowAmount>
</TableRow>
<TableRow>
    <TableRowDescription>{formattedPartialPayment}</TableRowDescription>
    <TableRowAmount><NumberFormat style={{textDecoration:'underline'}} value={formattedPrice} decimalScale={2} fixedDecimalScale={true}  displayType={'text'} thousandSeparator={true} prefix={'£'} /></TableRowAmount>
</TableRow>
<TableRow> 
    <TableRowDescription>Total</TableRowDescription>
    <TableRowAmount><NumberFormat value={grandTotal} displayType={'text'} fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} prefix={'£'} /></TableRowAmount>
</TableRow>
</tbody></Table>

<br/>
{purchase.frequency.productFrequencyName === "Monthly" &&
<React.Fragment>
<TableHeader>Direct Debit</TableHeader>
<Table><tbody>
<TableRow>
    <TableRowDescription>Ongoing {purchase.frequency.productFrequencyName.toLowerCase()} payments starting {formattedStartOfNextMonth}</TableRowDescription>
    <TableRowAmount><NumberFormat value={priceForAllSpaces} displayType={'text'} fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} prefix={'£'} /></TableRowAmount>
</TableRow>
</tbody></Table>
</React.Fragment>}
</React.Fragment>
);
      }
    }