
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AssetDataService } from '../services/asset-data.service';
import { assetActionTypes } from './asset-chart.actions';
import { Asset } from '../model/assets.model';

@Injectable()
export class CourseEffects {


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
      concatMap((action) => this.assetData.getDataOfMeasurements()),
      map(measurements => assetActionTypes.measurementsLoaded({ measurements }))
    )
  );

  createTreeView$ = createEffect(() =>
    this.actions$.pipe(
      ofType(assetActionTypes.assetsLoaded)
    )
  );

  //   deleteCourse$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(courseActionTypes.deleteCourse),
  //       concatMap((action) => this.courseService.deleteCourse(action.courseId))
  //     ),
  //     {dispatch: false}
  //   );

  // updateAsset$ = createEffect(() =>
  // this.actions$.pipe(
  //   ofType(chartActionTypes.updateAsset),
  //   concatMap((action) => this.assetData.(action.update.id, action.update.changes))
  // ),
  // {dispatch: false}
  // );


  constructor(private assetData: AssetDataService, private actions$: Actions) { }
}