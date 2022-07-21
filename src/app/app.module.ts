import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssetChartDataComponent } from './components/asset-chart-data/asset-chart-data.component';
import { AssetDataService } from './services/asset-data.service';
import { HttpClientModule } from '@angular/common/http';


// Angular Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './store';
import { assetEffects } from './state/asset-chart.effects';
import { assetReducer } from './state/asset-chart.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';





@NgModule({
  declarations: [
    AppComponent,
    AssetChartDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    NgChartsModule,
    StoreModule.forFeature('asset', assetReducer),
    EffectsModule.forFeature([assetEffects]),
    EffectsModule.forRoot([]),
    StoreModule.forRoot((reducers), {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({maxAge: 25})
  ],
  providers: [AssetDataService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
