import { IAppContainerState } from './app-container-state'
import { IReferenceDataState } from './reference-data-state'
import { IPurchaseState } from './purchase-state'

import { IPermitsState } from './permits-state'
import { IPermitState } from './permit-state'
import { IPermitNewState } from './permit-new-state'

import { ILocationState } from './location-state';

export interface IAppState {
  appContainer: IAppContainerState;
  referenceData: IReferenceDataState;
  purchaseContainer: IPurchaseState;
  permitsContainer: IPermitsState;
  permitContainer: IPermitState;
  permitNewContainer:IPermitNewState;
  locationContainer: ILocationState;
}