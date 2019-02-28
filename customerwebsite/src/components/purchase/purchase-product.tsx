import * as React from 'react'
import { IGeoLocation, IPermitProduct } from '../../models';
import { SingleWordGrid, ImageIcon, GridText } from '../../styles/style';

export interface IPurchaseProductProps {
    products:Array<IPermitProduct>;
    selectProduct(product: IPermitProduct): void;
}
    
export interface IPurchaseProductState {
    isOpenId: number;
    mapCentre: IGeoLocation | null;
};
    
export class PurchaseProduct extends React.Component<IPurchaseProductProps, IPurchaseProductState> {
    constructor(props: IPurchaseProductProps) {
        super(props);
        this.state = {isOpenId:0, mapCentre:{latitude:51.5252224,longitude:-0.15564799999999998}};         
    }

componentWillMount() {
};

onToggleOpen(siteId: number) {
        let newSiteId: number = siteId;
        if (this.state.isOpenId === newSiteId)
        {
           newSiteId = 0;
        }
        this.setState({isOpenId:newSiteId});
}

selectProduct(product: IPermitProduct){
    this.props.selectProduct(product);
}

render() {
    const {products} = this.props;
    return (
         <div><br/>
               {products.map((item, index) => (
                    <SingleWordGrid key={index}>
                        <GridText key={item.permitProductId} onClick={() => this.props.selectProduct(item)}>
                        <ImageIcon key={3} src='/icons/parking.png'/>{item.permitProductName.toString()}</GridText>
                    </SingleWordGrid>
               )
               )}
         </div>
    )
}
}


