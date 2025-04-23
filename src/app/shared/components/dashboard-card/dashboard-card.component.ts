import { Component, Input } from '@angular/core';
import { GrossIconComponent } from "../../icons/gross/gross.component";
import { LossIconComponent } from "../../icons/loss/loss.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [GrossIconComponent, LossIconComponent, NgClass],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css',
})
export class DashboardCardComponent {
  @Input() label: string = '';
  @Input() number: string = '';
  @Input() percentage: string = '';
  @Input() period: string = '';
  @Input() isGross: boolean = true;
  @Input() bg: string = 'bg-white';
}
