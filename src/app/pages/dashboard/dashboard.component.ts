import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { BarChartComponent } from '../../shared/components/bar-chart/bar-chart.component';
import { DashboardCardComponent } from '../../shared/components/dashboard-card/dashboard-card.component';
import { DoughnutChartComponent } from '../../shared/components/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from '../../shared/components/line-chart/line-chart.component';
import { BoxIconComponent } from '../../shared/icons/box/box.component';
import { GroupIconComponent } from '../../shared/icons/group/group.component';
import { PendingIconComponent } from '../../shared/icons/pending/pending-icon.component';
import { SalesComponent } from '../../shared/icons/sales/sales.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashboardCardComponent,
    GroupIconComponent,
    BoxIconComponent,
    SalesComponent,
    ChartModule,
    BarChartComponent,
    DoughnutChartComponent,
    PendingIconComponent,
    LineChartComponent,
    TranslateModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
