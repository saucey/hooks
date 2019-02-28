import { fetchPermitProductEpic} from './fetch-product-epic';
import { fetchPermitsEpic, fetchPermitEpic} from './fetch-permits-epic';
import { fetchCustomerEpic } from './fetch-customers-epic';
import { appInitializeEpic, appInitializingEpic, appInitializedEpic} from './initialize-epic';
import { fetchRefDataProductFrequenciesEpic,
        fetchRefDataSiteTownsForClientEpic, 
        fetchRefDataClientsEpic} from './fetch-ref-data-epic';
import { upsertCustomerEpic, upsertCustomerSuccessEpic } from './upsert-customer-epic'
import { upsertPermitEpic, upsertPermitSuccessEpic} from './upsert-permit-epic';
import { fetchSitesForClientByLocationEpic } from './fetch-sites-for-client-epic';
import { fetchPermitProductsForSiteEpic } from './fetch-products-for-site-epic';
import { fetchGeoLocationEpic } from './location-epic';

export const epics = { 
    appInitializeEpic, appInitializingEpic, appInitializedEpic, 
    fetchRefDataSiteTownsForClientEpic, fetchRefDataProductFrequenciesEpic, fetchRefDataClientsEpic,
    fetchSitesForClientByLocationEpic,
    fetchPermitProductsForSiteEpic,
    fetchPermitProductEpic,

    fetchCustomerEpic,
    upsertCustomerEpic,
    upsertCustomerSuccessEpic,

    fetchPermitsEpic,
    fetchPermitEpic,
    upsertPermitEpic,
    upsertPermitSuccessEpic,
    fetchGeoLocationEpic
};