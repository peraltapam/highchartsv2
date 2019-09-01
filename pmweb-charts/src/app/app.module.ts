import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { ChartComponent } from './shared/components/chart/chart.component';
import { MediaChartComponent } from './components/media-chart/media-chart.component';
import { DefaultChartComponent } from './components/default-chart/default-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    MediaChartComponent,
    DefaultChartComponent
  ],
  imports: [
    BrowserModule,
    HighchartsChartModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
