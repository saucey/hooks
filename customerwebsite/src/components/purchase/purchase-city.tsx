import * as React from 'react'
import { ITown } from '../../models';
import { SingleWordGrid, City, CityGrid, VerticalSpacer5 } from '../../styles/style';

export interface IPurchaseCityProps {
    towns: Array<ITown>; 
    selectTown(town: ITown): void;
}
    
export interface IPurchaseCityState {};
    
export class PurchaseCity extends React.Component<IPurchaseCityProps> {

    render() {
        return (
            <React.Fragment>
            {window.innerWidth > 550 && <VerticalSpacer5/>}
            <CityGrid>
               {this.props.towns.map(item => (
                    <SingleWordGrid key={item.town}>
                        <City key={item.town} onClick={() => this.props.selectTown(item)}>{item.town.toString()}</City>
                    </SingleWordGrid>
               )
               )}
             </CityGrid>
             </React.Fragment>
        )
    }
}
