import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '../../store/state';
import { PurchaseHome } from './purchase';
import { fetchSitesForClientByLocation, fetchPermitProductsForSite, fetchPermitProduct, upsertPermit } from '../../store/actions';
import { IProductSearchModel, ISiteLocationSearchModel, IPurchase } from '../../models';
import { IAppAction } from '../../store/app-action';

const mapStateToProps = (state: IAppState) => {
return { 
client: state.appContainer.client,
towns: state.referenceData.siteTowns,
sites: state.purchaseContainer.siteLocationSearch,
products: state.purchaseContainer.products,
product: state.purchaseContainer.product,
productFrequencies: state.referenceData.productFrequencies,
isProcessing : state.purchaseContainer.isProcessing,
permit: state.purchaseContainer.permit
};
};

const mapDispatchToProps = (dispatch: Dispatch<IAppAction>) => {
return {
    fetchSites(searchModel:ISiteLocationSearchModel) { 
        dispatch(fetchSitesForClientByLocation(searchModel));
    },
    fetchProducts(searchModel:IProductSearchModel) { 
        dispatch(fetchPermitProductsForSite(searchModel));
    },
    fetchProduct(permitProductId:number) { 
        dispatch(fetchPermitProduct(permitProductId.toString()));
    },
    onSave(permitId: number, purchase: IPurchase) {
        dispatch(upsertPermit(permitId, purchase, true));
    },
   };
};

export const PurchaseContainer = connect(mapStateToProps, mapDispatchToProps)(PurchaseHome);