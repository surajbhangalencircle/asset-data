
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AssetDataService } from '../services/asset-data.service';
import { assetActionTypes } from './asset-chart.actions';
import { Asset } from '../components/asset';
import { Measurement } from '../model/measurements.model';


@Injectable()
export class assetEffects {

  loadAssets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(assetActionTypes.loadAssets),
      concatMap(() => this.assetData.getTreeNode()),
      map((asset: Asset[]) => assetActionTypes.assetsLoaded({ asset }))
    )
  );

  loadMeasurements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(assetActionTypes.loadMeasurements),
      concatMap(() => this.assetData.getDataOfMeasurements()),
      map((measurements: Measurement[]) => assetActionTypes.measurementsLoaded({ measurements }))
    )
  );

  currentAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(assetActionTypes.currentAsset),
      concatMap(() => this.assetData.getDataOfMeasurements()),
      map((measurements: Measurement[]) => assetActionTypes.measurementsLoaded({ measurements }))
    )
  );

  constructor(private assetData: AssetDataService, private actions$: Actions) { }
}