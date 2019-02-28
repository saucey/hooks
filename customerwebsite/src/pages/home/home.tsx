import * as React from 'react'
import glamorous from 'glamorous'
import { IPageProps } from '../page-props'
import {  AppContainer } from '../../components'
import "font-awesome/css/font-awesome.css";
import { IClient } from '../../models';

const HomeWrapper = glamorous.div({ label: 'HomeWrapper', display: 'flex', flexDirection: 'column'});

export interface IHomeProps extends IPageProps {
    client:IClient;
    isProcessing: boolean;
}

export interface IHomeState {
   // selectedTab: number;
}

export class Home extends React.Component<IHomeProps, IHomeState>{

constructor(props: IHomeProps) {
    super(props); 
}

componentWillMount() {  
}

changeTab = (event, value) => {
  };

render() {
//const {customer, isProcessing, clients, regions, countries, fetchCustomer, onSave, resetSuccess, onCancel, isSaved } = this.props;
return (
<AppContainer title='Dashboard' renderFooter={() => {return <div/>}} render={() => {
//if (isProcessing && customer === undefined) { return <AppLoading/>};
return (
<HomeWrapper> 

</HomeWrapper>
);
}}/>

);
}
}