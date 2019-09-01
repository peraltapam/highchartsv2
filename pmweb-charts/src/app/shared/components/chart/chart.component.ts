import { Component, OnInit, Input } from '@angular/core';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() options: any;
  @Input() colors: string[];

  Highcharts = Highcharts;

  ngOnInit() {
    // set color pattern
    if(this.colors && this.colors.length) {
      Highcharts.setOptions({
        colors: this.colors
      });
    }
  }

}
