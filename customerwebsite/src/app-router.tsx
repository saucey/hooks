import * as React from 'react';
import { Route } from 'react-router-dom';
import { PurchaseContainer } from './pages';
import { appHistory } from './app-history';
import { ConnectedRouter } from 'connected-react-router';

export const AppRouter = () => {
    return (
        <ConnectedRouter history={appHistory()}>
            <React.Fragment>
                <Route exact={true} path={'/'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/intro'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/city'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/site'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/product'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/frequency'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/spaces'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/vrms'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/startdate'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/summary'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/bankaccount'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/cardpayment'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/confirmation'} component={PurchaseContainer} />
            </React.Fragment>
        </ConnectedRouter>
    );
};