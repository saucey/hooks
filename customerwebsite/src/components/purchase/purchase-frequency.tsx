import * as React from 'react'
import { IGeoLocation, IProductFrequency, IProductPrice } from '../../models';
import { SingleWordGrid, SubText, ImageIcon, GridText, FullGrid } from '../../styles/style';
import { createProductFrequenciesFromProductPrices } from '../../helpers/frequency';

export interface IPurchaseFrequencyProps {
    prices:IProductPrice;
    productFrequencies: Array<IProductFrequency>;
    selectFrequency(frequency: IProductFrequency): void;
}
    
export interface IPurchaseFrequencyState {
    isOpenId: number;
    mapCentre: IGeoLocation | null;
    productFrequenciesWithPrices: Array<IProductFrequency>;
};
    
export class PurchaseFrequency extends React.Component<IPurchaseFrequencyProps, IPurchaseFrequencyState> {
    constructor(props: IPurchaseFrequencyProps) {
        super(props);
        this.state = {isOpenId:0, mapCentre:{latitude:51.5252224,longitude:-0.15564799999999998}, productFrequenciesWithPrices: createProductFrequenciesFromProductPrices(props.prices)};         
    }

static getDerivedStateFromProps(props: IPurchaseFrequencyProps, state: IPurchaseFrequencyState){
     return {productFrequenciesWithPrices: createProductFrequenciesFromProductPrices(props.prices)}
}

// componentWillReceiveProps(nextProps:IPurchaseFrequencyProps){
//     if(this.props.prices !== nextProps.prices){
//          this.createProductFrequency(nextProps.prices);  
//     }
// }

// componentDidMount() {
//     this.createProductFrequency(this.props.prices);
// };

// createProductFrequency(prices: IProductPrice) {
//     if (prices) this.setState({productFrequenciesWithPrices: createProductFrequenciesFromProductPrices(prices)});
// }

onToggleOpen(siteId: number) {
        let newSiteId: number = siteId;
        if (this.state.isOpenId === newSiteId)
        {
           newSiteId = 0;
        }
        this.setState({isOpenId:newSiteId});
}

selectFrequency(frequency: IProductFrequency){
    this.props.selectFrequency(frequency);
}

render() {
    const {productFrequenciesWithPrices} = this.state;
    return (
         <div><br/>
         <FullGrid>
               {productFrequenciesWithPrices.map((item, index) => (
                    <SingleWordGrid key={index}>
                        <GridText key={item.productFrequencyId} onClick={() => this.props.selectFrequency(item)}>
                        <ImageIcon src='/icons/ticket.png'/>
                        {item.productFrequencyName.toString()} - £{item.price.toString()}
                        <SubText key={3}> ({item.productFrequencyDescription?item.productFrequencyDescription.toString():''})</SubText>
                        </GridText>
                    </SingleWordGrid>
               )
               )}
        </FullGrid>
         </div>
    )
}
}


