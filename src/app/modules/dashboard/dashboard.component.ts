import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('barChart') barChart: ElementRef;


  constructor() { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    const myCharts = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['USA', 'Spain', 'Italy', 'France', 'Germany'],
        datasets: [{
          label: 'Total cases.',
          data: [886789, 213024, 189973, 158183, 153129],
          backgroundColor: ['red'],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
      }
    });
  }
}
