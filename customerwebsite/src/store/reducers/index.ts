//import appReducer from './permit-product-reducer'
import purchaseReducer from './purchase-reducer'
import appContainerReducer from './app-container-reducer'
import referenceDataReducer from './reference-data-reducer'
import permitsReducer from './permits-reducer'
import permitReducer from './permit-reducer'
import permitNewReducer from './permit-new-reducer'
import locationReducer from './location-reducer';

export const reducers = {
    appContainer:appContainerReducer, referenceData:referenceDataReducer, 
    purchaseContainer:purchaseReducer, 
    permitsContainer:permitsReducer, permitContainer:permitReducer, permitNewContainer: permitNewReducer,
    locationContainer:locationReducer
};