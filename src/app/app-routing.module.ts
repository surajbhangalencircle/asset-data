import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetComponent } from './components/test/asset.component';
import { AssetChartDataComponent } from './components/asset-chart-data/asset-chart-data.component';

const routes: Routes = [
  // {path: '', redirectTo:'asset-chart-data', pathMatch: 'full'},
  // {path: 'asset-chart-data', component: AssetChartDataComponent},
  // {path: 'asset1', component: AssetComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
