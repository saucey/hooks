import { combineEpics } from 'redux-observable';
import { fetchPermitProductEpic } from './epics/fetch-product-epic'
import { fetchPermitsEpic, fetchPermitEpic } from './epics/fetch-permits-epic'
import { fetchCustomerEpic } from './epics/fetch-customers-epic'
import { fetchRefDataProductFrequenciesEpic,fetchRefDataSiteTownsForClientEpic, fetchRefDataClientsEpic} from './epics/fetch-ref-data-epic'
import { appInitializeEpic, appInitializingEpic, appInitializedEpic } from './epics/initialize-epic'
import { upsertCustomerEpic, upsertCustomerSuccessEpic } from './epics/upsert-customer-epic'
import { upsertPermitEpic, upsertPermitSuccessEpic} from './epics/upsert-permit-epic'
import { fetchSitesForClientByLocationEpic } from './epics/fetch-sites-for-client-epic';
import { fetchPermitProductsForSiteEpic } from './epics/fetch-products-for-site-epic';
import { fetchGeoLocationEpic } from './epics/location-epic';

export const rootEpic = combineEpics(
    appInitializeEpic, appInitializingEpic, appInitializedEpic,
    fetchRefDataSiteTownsForClientEpic,fetchRefDataProductFrequenciesEpic, fetchRefDataClientsEpic,
    fetchSitesForClientByLocationEpic,
    fetchPermitProductsForSiteEpic,
    fetchPermitProductEpic,
    upsertPermitEpic, upsertPermitSuccessEpic,

    fetchPermitsEpic, fetchPermitEpic,
    fetchCustomerEpic, upsertCustomerEpic, upsertCustomerSuccessEpic,
    fetchGeoLocationEpic
);