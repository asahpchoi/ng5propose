import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import { AppComponent } from './app.component';
import { PeService } from './pe.service';
import { MainAppComponent } from './main-app/main-app.component';
import 'hammerjs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProgressDirective } from './progress.directive';
import { NewChartComponent } from './new-chart/new-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    MainAppComponent,
    ProgressDirective,
    NewChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule, MatCheckboxModule,MatSliderModule,MatButtonToggleModule,
    MatIconModule,MatInputModule,BrowserAnimationsModule,MatTableModule,MatProgressSpinnerModule,
    MatProgressBarModule,
    ChartsModule
  ],

  exports: [MatButtonModule, MatCheckboxModule],
  providers: [PeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
