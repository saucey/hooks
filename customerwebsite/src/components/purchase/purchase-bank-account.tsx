import * as React from 'react'
import { IPurchase } from '../../models/purchase';
import { VerticalSpacer15 } from '../../styles';

export interface IPurchaseBankAccountProps {
    purchase:IPurchase;
}
    
export interface IPurchaseBankAccountState {
};
    
export class PurchaseBankAccount extends React.Component<IPurchaseBankAccountProps, IPurchaseBankAccountState> {
    constructor(props: IPurchaseBankAccountProps) {
        super(props);
        this.state = {};         
    }

render() {
   // const {purchase} = this.props;
    return (
         <div>
             <VerticalSpacer15/>
         </div>
    )
}
}


