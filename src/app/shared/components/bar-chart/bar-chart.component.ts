import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent implements OnInit{
  basicData: any;

  basicOptions: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'],
      datasets: [
        {
          label: 'Sales',
          data: [220, 124, 220, 190, 220, 124, 220, 124],
          backgroundColor: ['rgba(82, 134, 248, 1)'],
          borderWidth: 0.2,
          barThickness: 8,
          borderRadius: 10,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
          font: {
            size: 10,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,

          ticks: {
            color: textColorSecondary,
            padding: 20,
          },

          grid: {
            color: surfaceBorder,
            lineWidth: 0.5,
            drawBorder: false,
          },
          border: {
            display: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
            display: false,
          },
          border: {
            display: false,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio:3,
      layout: {
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
    };
  }
}
