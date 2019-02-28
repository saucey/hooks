import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '../../store/state';
import { Home } from './home';
import { fetchCustomer } from '../../store/actions';
import { IAppAction } from '../../store/app-action';

const mapStateToProps = (state: IAppState) => {
return { 
    client: state.appContainer.client,
    isProcessing: false
};
};

const mapDispatchToProps = (dispatch: Dispatch<IAppAction>) => {
return {
    fetchCustomer(customerId: number) { 
        dispatch(fetchCustomer(customerId));
    }
};
};

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);