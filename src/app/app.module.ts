import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


// Angular Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AssetDataService } from './services/asset-data.service';
import { AssetChartDataComponent } from './components/asset-chart-data/asset-chart-data.component';
import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    AppComponent,
    AssetChartDataComponent,
    
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
    NgChartsModule
  ],
  providers: [AssetDataService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }