import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { assetDataReducer, AssetDataState, assetReducer, AssetState, measurementReducer, MeasurementState } from '../state/asset-chart.reducers';



export interface AppState {
    assetState : AssetState;
    measurementState: MeasurementState;
    assetDataState: AssetDataState;

}

export const reducers: ActionReducerMap<AppState> = {
    assetState: assetReducer,
    measurementState: measurementReducer,
    assetDataState: assetDataReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];