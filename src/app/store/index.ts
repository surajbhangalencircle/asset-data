import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCounter from '../state/asset-chart.reducers';
import { AssetState, MeasurementState } from '../state/asset-chart.reducers';



export interface AppState {}
export interface State {
    "counter" : number;
    assetState : AssetState;
    measurementState: MeasurementState;
  }
  
export const reducers: ActionReducerMap<AppState> = {
    "counter": fromCounter.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];