import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  loadTemplate = false;
  showErrorMsg = false;

  chartOptions = {
    title: {
      useHTML: true,
      text: '',
      align: 'left',
      style: {
        textTransform: 'uppercase',
        font: 'bold 18px "Poppins", sans-serif'
      }
    },
    subtitle: {
      text: '',
      align: 'left',
      style: {
        fontSize: '10px',
        position: 'absolute',
        font: '9px "Poppins", sans-serif'
      }
    },
    legend: {
      itemDistance: 10,
      verticalAlign: 'top',
      x: 0,
      itemStyle: {
        font: '"Poppins", sans-serif'
      },
    },
    yAxis: {
      title: { text: '' },
      type: 'linear',
      tickInterval: '50000'
    },
    xAxis: {
      categories: [],
      title: { text: '' },
      type: 'datetime',
      labels: {
        formatter: function() {
          // split date to show only day number
          let day = this.value.split('/');
          return day[0];
        }
      }
    },
    tooltip: {
      formatter: function() {
        return `<div>${this.series.name}</div><br/>
          <span style="color:${this.series.color}">\u25CF</span><span>${this.x} :</span>
          <strong>R$ ${this.y.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</strong>`;
      }
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        }
      }
    },
    series: []
  };

  rawSeries = [];

  Highcharts = Highcharts;

  constructor(private dataService: DataService) {}

  // get json data
  fetchData() {
    this.dataService.getData().subscribe(
      data => {
        if(data.success) {
          const revenueData = data.metrics.revenue_by_medium;
          
          // set title
          const dateRange = this.getDateRangeText(data.start_date, data.end_date);
          this.chartOptions.title.text = `<span>${revenueData.title}</span>
            <span style="color:#b8b8b8; font-size:12px; margin-left:10px">${dateRange}</span>`;

          // set subtitle
          this.chartOptions.subtitle.text = revenueData.description;

          // set series data
          this.rawSeries = revenueData.data.series;

          // create series array of objects
          this.createSeries(this.rawSeries[0].data);

          // populate series arrays
          for(let i = 0; i < this.chartOptions.series.length; i++) {
            this.chartOptions.series[i].data = this.getDataByType(this.chartOptions.series[i].name);
          }

          // set x axis data labels
          this.chartOptions.xAxis.categories = this.rawSeries.map( (serie: {name: string, data: []}) => {
            return this.formatBrDate(serie.name);
          });

          this.setChart();
        } else {
          this.showErrorMsg = true;
        }
      },
      error => {
        this.showErrorMsg = true;
        throw new Error(error);
      }
    )
  }

  /**
   * updates chartOptions series with object structure
   * @param  {[]} seriesArray
   */
  createSeries(seriesArray: []) {
    Object.keys(seriesArray).forEach( elem => {
      this.chartOptions.series.push({
        name:elem,
        data: []
      });
    });
  }

  /**
   * group specific series data in array
   * @param  {string} type of data to be grouped
   * @return {array} array of specific series type/name
   */
  getDataByType(type: string): Array<any> {
    return [...this.rawSeries].map((element: any) => parseFloat(element.data[type].replace(",", ".")));
  }

  /**
   * format date to dd/mm/yyyy
   * @param  {string} date
   * @return {string} formatted date
   */
  formatBrDate(date: string): string {
    return date.split('-').reverse().join('/')
  }

  /**
   * format date range
   * @param  {string} start date "yyyy-mm-dd"
   * @param  {string} end date "yyyy-mm-dd"
   * @return {string} formatted date range
   */
  getDateRangeText(start: string, end: string): string {
    const startDate = this.formatBrDate(start);
    const endDate = this.formatBrDate(end);
    return `${startDate} - ${endDate}`;
  }
  
  /**
   * set highcharts color options
   * update template
   */
  setChart() {
    // set color pattern
    Highcharts.setOptions({
      colors: [ '#ff0085', '#ffd258', '#00c6ff', '#ff3000', '#3c56cd', '#7500a4']
    });
    this.loadTemplate = true;
  }

  ngOnInit() {
    this.fetchData();
  }

}
