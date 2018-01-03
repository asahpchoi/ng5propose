import { Component, OnInit } from '@angular/core';
import { PeService } from '../pe.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-new-chart',
  templateUrl: './new-chart.component.html',
  styleUrls: ['./new-chart.component.css']
})
export class NewChartComponent {
  loading = true;
  constructor(
    private pe: PeService

  ) {

    this.pe.dataSet.filter(x => x).subscribe(
      data => {

        //console.log(data);
        this.lineChartData = data.map(r => {
          let localData = r.slice(0);
          let label = localData.shift();

          if(label == 'Age') {
            this.lineChartLabels = localData;
          }

            return {
              label: label,
              data: localData
            }
          }
        ).filter(
          x => x.label != 'Age'
        );
        this.loading=false;
      }
    )

  }

  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }

  ];
  public lineChartLabels: Array<any> = _.range(31,100);

  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public lineChartColors: Array<any> = [];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
