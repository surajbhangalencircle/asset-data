import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, State } from "@ngrx/store";
import { AssetData } from "../model/assetData.model";
import { Asset } from "../model/assets.model";
import { Measurement } from "../model/measurements.model";
import { assetActionTypes } from "./asset-chart.actions";




export interface AssetState extends EntityState<Asset> {
    assetsLoaded: boolean;
}
export const assetAdapter: EntityAdapter<Asset> = createEntityAdapter<Asset>();
export const assetinitialState = assetAdapter.getInitialState({
    assetsLoaded: false
});


export interface MeasurementState extends EntityState<Measurement> {
    measurementsLoaded: boolean;
}
export const measurementAdapter: EntityAdapter<Measurement> = createEntityAdapter<Measurement>();
export const measurementinitialState = measurementAdapter.getInitialState({
    measurementsLoaded: false
});




export interface AssetDataState extends EntityState<AssetData> {
    setChartData: boolean;
}
export const assetDataAdapter: EntityAdapter<AssetData> = createEntityAdapter<AssetData>();
export const assetDatainitialState = assetDataAdapter.getInitialState({
    setChartData: false
});


export const assetReducer = createReducer(
    assetinitialState,
    on(assetActionTypes.assetsLoaded, (state, action) => {
        return assetAdapter.setAll(
            action.asset,
            { ...state, assetsLoaded: true }
        );
    }),
);

export const measurementReducer = createReducer(
    measurementinitialState,
    on(assetActionTypes.measurementsLoaded, (state, action) => {
        return measurementAdapter.setAll(
            action.measurements,
            { ...state, measurementsLoaded: true }
        ); 
    }),
);


export const assetDataReducer = createReducer(
    assetDatainitialState,
    on(assetActionTypes.setChartData, (state, action) => {
        return assetDataAdapter.setAll(
            action.assetData,
            { ...state, measurementsLoaded: true }
        );
    }),
);



// export function reducer(state = assetDatainitialState, action: assetActionTypes): AssetState {
//     switch (action.type) {
//       case assetActionTypes.assetsLoaded: {
//         return assetAdapter.({
//           ...state,
//           loading: false,
//           error: null
//         });
//       }
  
//       case assetActionTypes.assetsLoaded: {
//         return assetAdapter.addAll(action.payload, {
//           ...state,
//           loading: false,
//           error: null
//         });
//       }
  
//       default: {
//         return state;
//       }
//     }
// }
export const { selectAll, selectIds } = assetDataAdapter.getSelectors();