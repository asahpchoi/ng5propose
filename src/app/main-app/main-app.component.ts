import { Component, OnInit } from '@angular/core';
import { PeService } from '../pe.service';
import * as c3 from 'c3';
import {MatTableDataSource} from '@angular/material';
import anime from 'animejs'

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  faceAmount = 150000;
  gender='M';
  age=30;
  fundAct = [
      {
        "attainAge": "40",
        "topupPremium": "20000.0",
        "withdrawal": "10000.0"
      },
      {
        "attainAge": "41",
        "topupPremium": "20000.0",
        "withdrawal": "10000.0"
      },
      {
        "attainAge": "42",
        "topupPremium": "20000.0",
        "withdrawal": "10000.0"
      },
      {
        "attainAge": "43",
        "topupPremium": "20000.0",
        "withdrawal": "10000.0"
      },
      {
        "attainAge": "44",
        "withdrawal": "10000.0"
      },
      {
        "attainAge": "45",
        "withdrawal": "10000.0"
      }
    ];

  dataSource
  displayedColumns;// = ['position', 'name', 'weight', 'symbol'];

  loading = false;
  chart;
  constructor(private pe:PeService) {

  }

  ngOnInit() {
    this.change();
  }

  startAnimation() {

  }

  change() {
    this.loading = true;
    //this.pe.getResult()
    this.pe.calcProjection({
      productId: 'US789',
      faceAmount: this.faceAmount,
      age: this.age,
      gender: this.gender,
      fundAct: this.fundAct
    });

    this.pe.dataSet.subscribe(data => {
      console.log('sub', data);
      if(!data)return;

      let chartData = data;

      if(!this.chart) {
        this.chart = c3.generate({
        bindto: '#chart',
            data: {
                x: 'Age',
                columns: chartData,
                type : 'area',

            }
        });
      } else {
        this.chart.load(
          {x:'Age',
            columns: chartData,
            type : 'area',
          }
        )
      }
      this.loading = false;
    })
  }

  getSchema() {

  }


}
