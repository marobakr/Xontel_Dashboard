import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [ChartModule],
templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent {
  data: any;

  options: any;

  ngOnInit() {


    this.data = {
      labels: ['January', 'February', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Sales',
          data: [20, 39, 33, 30, 32],
          fill: false,
          borderColor: 'rgba(0, 182, 155, 1)',
          tension: 0.4,
        },
      ],
    };


    this.options = {
      maintainAspectRatio: true,
      aspectRatio: 1.7,
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'rgba(0, 182, 155, 1)',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'rgba(41, 44, 47, 0.4)',
          },
          grid: {
            color: 'rgba(151, 151, 151, 1)',
            drawBorder: false,
            display: false,
          },
          border: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: 'rgba(41, 44, 47, 0.4)',
            stepSize: 10,
          },
          grid: {
            color: 'rgba(151, 151, 151, 1)',
            drawBorder: false,
            lineWidth: 0.2,
          },
          border: {
            display: false,
          },
        },
      },
    };
  }
}
