import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetChartDataComponent } from './components/asset-chart-data/asset-chart-data.component';

const routes: Routes = [
  // {path: '', redirectTo:'asset', pathMatch: 'full'},
  // {path: 'asset-chart-data', component: AssetChartDataComponent},
  // {path: 'asset', component: AssetComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
