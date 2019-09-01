import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-chart',
  templateUrl: './default-chart.component.html',
  styleUrls: ['./default-chart.component.scss']
})
export class DefaultChartComponent implements OnInit {

  options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Reusing Chart Component with Mock Data'
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Line 1',
      data: [1, 6, 2, 10]
    },
    {
      name: 'Line 2',
      data: [2, 4, 3, 12]
    },
    {
      name: 'Line 2',
      data: [6, 2, 8, 1]
    }]
  };

  constructor() { }

  ngOnInit() {
  }

}
