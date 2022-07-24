import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Asset } from "../components/asset";
import { Measurement } from "../model/measurements.model";
import { assetActionTypes, CounterActions, CounterActionTypes, } from "./asset-chart.actions";




export interface AssetState extends EntityState<Asset> {
    assetsLoaded: boolean;
}
export const assetAdapter: EntityAdapter<Asset> = createEntityAdapter<Asset>();
export const assetinitialState = assetAdapter.getInitialState({
    assetsLoaded: false
});


export const assetReducer = createReducer(
    assetinitialState,
    on(assetActionTypes.assetsLoaded, (state, action) => {
        return assetAdapter.setAll(
            action.asset,
            {
                ...state,
                assetsLoaded: true
            }
        );
    }),
);


export interface MeasurementState extends EntityState<Measurement> {
    measurementsLoaded: boolean;
}
export const measurementAdapter: EntityAdapter<Measurement> = createEntityAdapter<Measurement>({
    selectId: (entity => entity.assetId)
});
export const measurementinitialState = measurementAdapter.getInitialState({
    measurementsLoaded: false
});

export const measurementReducer = createReducer(
    measurementinitialState,
    on(assetActionTypes.measurementsLoaded, (state, action) => {
        return measurementAdapter.setAll(

            action.measurements,
            { ...state, measurementsLoaded: true }
        );
    }),
);



export interface AssetDataState extends EntityState<Measurement> {
    getSelected: boolean;
}
export const assetDataAdapter: EntityAdapter<Measurement> = createEntityAdapter<Measurement>();
export const assetDatainitialState = assetDataAdapter.getInitialState({
    getSelected: false
});

export const counterinitialState: number = 0;

export function reducer(state = counterinitialState, action: CounterActions): number {
    switch (action.type) {
        case CounterActionTypes.Increment:
            return state + 1;
        case CounterActionTypes.Decrement:
            return state - 1;
        case CounterActionTypes.Reset:
            return 0;
        default:
            return state;
    }

}


export const { selectAll, selectIds } = assetAdapter.getSelectors();