import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class PeService {

  dataSet: BehaviorSubject<any>;

  constructor(
    private http: HttpClient
  ) {
    this.dataSet = new BehaviorSubject<any>(null);
  }


  getSchema() {
    let code = 'RE100';
    let url = `https://product-engine-nodejs.herokuapp.com/api/v1/product/readSchema/${code}/01`;
    console.log(url);

    this.http.get(url)
      .first()
      .subscribe(
      data => console.log(data),
      error => alert(error),
    )
  }

  getRow(columns, colName) {
    return [colName, ...columns.filter(x => x.Name == colName)[0].Values.map(x => Math.max(0, x.value))];
  }

  calcProjection(input) {
    let url = 'https://product-engine-nodejs.herokuapp.com/api/v1/product/project';

    let params = {
      "reference": "",
      "policyYearDate": "20170228024534",
      "policyExcludeSOS": "Y",
      "sortRider": "Y",
      "channel": "BANK",
      "coverageInfo": {
        "product": {
          "productKey": {
            "primaryProduct": {
              "productPK": {
                "productId": input.productId
              }
            },
            "associateProduct": {
              "productPK": {
                "productId": "--"
              }
            },
            "basicProduct": {
              "productPK": {
                "productId": "--"
              }
            },
            "valueDate": "20170228024534",
            "location": "PH"
          }
        },
        "currency": {
          "currencyPK": {
            "currencyId": "PHP"
          }
        },
        "faceAmount": input.faceAmount,
        "options": {
          "billingMethod": "SINGLE",
          "dbLevel": "Increase",
          "paymentMode": "A",
          "fundWithdrawalsByPercentage": "Y",
          "calculateSinglePremiumBand": "Y"
        },
        "otherOptions": null,
        "startAnnuityAge": "0",
        "parties": {
          "party": {
            "insuredId": "aaa aaa",
            "insuredAge": input.age,
            "insuredSex": input.gender,
            "smokingStatus": "ST",
            "type": "BASIC"
          }
        },
        "extraRating": {
          "flatExtra": "0.0",
          "percentageExtra": "1.0",
          "tempFlat": "0.0",
          "tempFlatDuration": "0",
          "tempPercentage": "0.0",
          "tempPercentageDuration": "0"
        },
        "band": "0",
        "ipoLayer": "0",
        "noOfInstallmentYear": "0",
        "prepayYear": "0",
        "withdrawPercent": "0.0",
        "plannedPremium": "0.0",
        "compropPremium": "0.0",
        "refundPremium": "0.0",
        "topUpPremium": "0.0",
        "initialDumpIn": "100000.0",
        "basicIncreasingPremiumPercentage": "0.0",
        "topUpIncreasingPremiumPercentage": "0.0",
        "fundInt": "5.0",
        "fixedAmount": "0",
        "dividendWithdrawals": ""
      },
      "riders": null,
      "funds": {
        "fundRecord": [
          {
            "allocation": "60.00",
            "returnRate": "4.0000",
            "returnRateMedium": "8.0000",
            "returnRateHigh": "10.0000",
            "guaranteedPercentage": "0.0000",
            "targetPayoutRate": "0.0000",
            "_code": "SECURE"
          },
          {
            "allocation": "40.00",
            "returnRate": "4.0000",
            "returnRateMedium": "8.0000",
            "returnRateHigh": "10.0000",
            "guaranteedPercentage": "0.0000",
            "targetPayoutRate": "0.0000",
            "_code": "DIVERSIFIED"
          }
        ]
      },
      "fundActivities": {
        "fundActivity": input.fundAct
      }
    };

    this.http.post(url, params).subscribe(
      data => {

        let results = [];

        ['Age', 'Account Value (LOW)', 'NAR (LOW)'].forEach(
          col => {
            let row = this.getRow((<any>data).projections[0].columns, col);
            results.push(row);
          }
        );

        this.dataSet.next(results);

        //this.dataSet.next(results);
      }
    );
  }


}
