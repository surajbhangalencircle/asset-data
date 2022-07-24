import { Action, createAction, props } from '@ngrx/store';
import { Asset } from '../components/asset';
import { Measurement } from '../model/measurements.model';




export const loadAssets = createAction(
  '[Assets] Load assets via Service',
);

export const assetsLoaded = createAction(
  '[Assets Effect] assets Loaded Successfully',
  props<{ asset: Asset[] }>()
);


export const loadMeasurements = createAction(
  '[Measurements] Load measurements via service',
);

export const measurementsLoaded = createAction(
  '[Measurements Effect] Measurements Loaded Successfully',
  props<{ measurements: Measurement[] }>()
);


export const currentAsset = createAction(
  '[Assets] Get currently selected asset',
  props<{ assetId: number }>()
);

export enum CounterActionTypes {
  Increment = '[Counter] Increment',
  Decrement = '[Counter] Decrement',
  Reset = '[Counter] Reset'
}

export class CounterIncrement implements Action {
  readonly type = CounterActionTypes.Increment;
}

export class CounterDecrement implements Action {
  readonly type = CounterActionTypes.Decrement;
}

export class CounterReset implements Action {
  readonly type = CounterActionTypes.Reset;
}

export type CounterActions = CounterIncrement | CounterDecrement | CounterReset;

export const assetActionTypes = {
  loadAssets,
  assetsLoaded,
  loadMeasurements,
  measurementsLoaded,
  currentAsset,
};


