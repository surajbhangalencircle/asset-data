
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AssetDataService } from '../services/asset-data.service';

@Injectable()
export class CourseEffects {

  loadAssets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(assetActionTypes.loadCourses),
      concatMap(() =>this.),
      map(courses => assetActionTypes.assetsLoaded({assets}))
    )
  );

//   createCourse$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(courseActionTypes.createCourse),
//       concatMap((action) => this.courseService.createCourse(action.course)),
//       tap(() => this.router.navigateByUrl('/courses'))
//     ),
//     {dispatch: false}
//   );

//   deleteCourse$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(courseActionTypes.deleteCourse),
//       concatMap((action) => this.courseService.deleteCourse(action.courseId))
//     ),
//     {dispatch: false}
//   );

  updateCOurse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.updateCourse),
      concatMap((action) => this.courseService.updateCourse(action.update.id, action.update.changes))
    ),
    {dispatch: false}
  );

  constructor(private courseService: CourseService, private actions$: Actions, private router: Router) {}
}