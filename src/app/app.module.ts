import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Angular Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AssetComponent } from './components/test/asset.component';
import { HttpClientModule } from '@angular/common/http';
import { AssetDataService } from './services/asset-data.service';
import { AssetChartDataComponent } from './components/asset-chart-data/asset-chart-data.component';



@NgModule({
  declarations: [
    AppComponent,
    AssetChartDataComponent,
    AssetComponent
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
  ],
  providers: [AssetDataService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
