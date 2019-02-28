import * as React from 'react'
import { PurchaseFooterList, PurchaseFooterListItem, PurchaseFooterItemIcon, PurchaseFooterItemLink, 
  PurchaseFooterItemText, PurchaseFooterItemWideIcon, PurchaseFooterHelp, PurchaseFooterBackground } from "../../styles/style";
import { CSSTransition } from 'react-transition-group'
import { IPurchase } from '../../models/purchase';
import { getClient } from '../../helpers';
import { IClient } from '../../models';
import Measure from 'react-measure';
import LocationIcon from './location.png';
import ParkingIcon from './parking.png';
import TicketIcon from './ticket.png';
import CarIcon from './car.png';
import PlateIcon from './plate.png';
import CalendarIcon from './calendar.png';

export interface IPurchaseFooterProps
{
    step:number;
    purchase: IPurchase;
}

export interface IPurchaseFooterState
{
    dimensions: any;
}

export class PurchaseFooter extends React.Component<IPurchaseFooterProps, IPurchaseFooterState>{
    constructor(props: IPurchaseFooterProps) {
        super(props); 
        this.state = {dimensions:null};
}

render(){
const {purchase, step} = this.props;
let client:IClient = getClient();
return (
<PurchaseFooterBackground>
{((step > 1 && step < 9  && client.clientId !== 447) || (step > 3 && step < 9  && client.clientId === 447)) 
&& (!this.state.dimensions || (this.state.dimensions && this.state.dimensions.height < 90))
&& <PurchaseFooterHelp>Click on any step to reselect your choice</PurchaseFooterHelp>}
  <Measure bounds onResize={contentRect => { this.setState({ dimensions: contentRect.bounds })}}>
  {({measureRef}) => (
<div ref={measureRef}>
<PurchaseFooterList >
<CSSTransition in={step > 1 && step < 9 && client.clientId !== 447 } classNames="footer" appear={true} timeout={300} unmountOnExit>
      <PurchaseFooterListItem key={1}>
        <PurchaseFooterItemLink to="/purchase/city" state={purchase}>
          <PurchaseFooterItemIcon src={LocationIcon}></PurchaseFooterItemIcon>
          <PurchaseFooterItemText>{purchase.town ? purchase.town.town:''}</PurchaseFooterItemText>
        </PurchaseFooterItemLink>
      </PurchaseFooterListItem>
</CSSTransition>
<CSSTransition in={step > 3 && step < 9 } classNames="footer" timeout={300} appear={true} unmountOnExit>
     <PurchaseFooterListItem key={2}>
        <PurchaseFooterItemLink to={{pathname:client.clientId === 447 ? '/purchase/product':'/purchase/site', state:{purchase: purchase }}}>
          <PurchaseFooterItemIcon src={ParkingIcon}></PurchaseFooterItemIcon>
          <PurchaseFooterItemText>{purchase.productName}</PurchaseFooterItemText>
        </PurchaseFooterItemLink>
      </PurchaseFooterListItem>
</CSSTransition>
<CSSTransition in={step > 4 && step < 9 && client.clientId !== 447 } classNames="footer" appear={true} timeout={300} unmountOnExit>
      <PurchaseFooterListItem key={3}>
        <PurchaseFooterItemLink to={{pathname:'/purchase/frequency', state:{purchase: purchase }}}>
          <PurchaseFooterItemIcon src={TicketIcon}></PurchaseFooterItemIcon>
          <PurchaseFooterItemText>{purchase.frequency ? purchase.frequency.productFrequencyName + ' £' + purchase.frequency.price: ''}</PurchaseFooterItemText>
        </PurchaseFooterItemLink>
      </PurchaseFooterListItem>
</CSSTransition>
<CSSTransition in={step > 5 && step < 9 && client.clientId !== 447} classNames="footer" appear={true} timeout={300} unmountOnExit>
     <PurchaseFooterListItem key={4}>
      <PurchaseFooterItemLink to={{pathname:'/purchase/spaces', state:{purchase: purchase }}}>
          <PurchaseFooterItemIcon src={CarIcon}></PurchaseFooterItemIcon>
          <PurchaseFooterItemText>{purchase.spaces}</PurchaseFooterItemText>
        </PurchaseFooterItemLink>
      </PurchaseFooterListItem>
</CSSTransition>
<CSSTransition in={step > 6 && step < 9 } classNames="footer" timeout={300} appear={true} unmountOnExit>
     <PurchaseFooterListItem key={5}>
       <PurchaseFooterItemLink to={{pathname:'/purchase/vrms', state:{purchase: purchase }}}>
          <PurchaseFooterItemWideIcon src={PlateIcon}></PurchaseFooterItemWideIcon>
          <PurchaseFooterItemText>{'\u2714'}</PurchaseFooterItemText>
        </PurchaseFooterItemLink>
      </PurchaseFooterListItem>
</CSSTransition>
<CSSTransition in={step > 7 && step < 9 } classNames="footer" timeout={300} appear={true} unmountOnExit>
     <PurchaseFooterListItem key={6}>
       <PurchaseFooterItemLink to={{pathname:'/purchase/startDate', state:{purchase: purchase }}}>
          <PurchaseFooterItemIcon src={CalendarIcon}></PurchaseFooterItemIcon>
          <PurchaseFooterItemText>{purchase.startDate? purchase.startDate.toLocaleDateString():''}</PurchaseFooterItemText>
        </PurchaseFooterItemLink>
      </PurchaseFooterListItem>
</CSSTransition>
</PurchaseFooterList>
</div>
  )}
</Measure>

</PurchaseFooterBackground>
);
      }
    }