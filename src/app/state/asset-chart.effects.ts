import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AssetDataService } from '../services/asset-data.service';
import { assetActionTypes } from './asset-chart.actions';
import { Measurement } from '../model/measurements.model';
import { TreeAsset } from '../model/treeAsset.model';


@Injectable()
export class assetEffects {

  loadAssets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(assetActionTypes.loadAssets),
      concatMap(() => this.assetData.getTreeNode()),
      map((asset: TreeAsset[]) => assetActionTypes.assetsLoaded({ asset }))
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
    ),
    {dispatch: false}
  );

  constructor(private assetData: AssetDataService, private actions$: Actions) { }
}