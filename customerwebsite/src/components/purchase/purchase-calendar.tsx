import * as React from 'react'
import { IPurchase } from '../../models/purchase';
import { NextButton } from '../../styles/style';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
import { getClient } from '../../helpers';
//import { Moment } from 'moment';
//import moment from 'moment';

  const theme = {
    accentColor: '#fe490d',
    floatingNav: { background: 'rgba(56, 87, 138, 0.94)', chevron: '#ff7b50', color: '#FFF' },
    headerColor: '#fe490d',
    selectionColor: '#ff5720',
    textColor: { active: '#FFF', default: '#333'},
    todayColor: '#ff7b50',
    weekdayColor: '#ff5720'
  };


export interface IPurchaseStartDateProps {
    purchase:IPurchase;
    productEndDate: Date | null;
    selectStartDate(startDate: Date): void;
}
    
export interface IPurchaseStartDateState {
    startDate: Date | null;
};
    
export class PurchaseStartDate extends React.Component<IPurchaseStartDateProps, IPurchaseStartDateState> {
    constructor(props: IPurchaseStartDateProps) {
        super(props);
        this.state = {startDate: new Date()};         
    }

selectDate(startDate: Date){
    this.setState({startDate: startDate});
}

render() {
    var today = new Date();
    const {productEndDate} = this.props;
    return (
        <React.Fragment>
         <div style={{margin:'0 auto'}}>
            <InfiniteCalendar height={window.innerWidth > 700 ? window.innerHeight - 530: window.innerHeight - 360} width={window.innerWidth > 1200 ? 1200: window.innerWidth - 60} selected={this.state.startDate} disabledDays={[]} theme={theme}
            min={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} 
            minDate={today} maxDate={getClient().clientId === 447 && productEndDate? productEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))} 
            onSelect={(e) => this.selectDate(e)}/>
         </div>
         <NextButton style={{marginTop:20}} onClick={() => this.props.selectStartDate(this.state.startDate)}/>
        </React.Fragment>
    )
}
}








