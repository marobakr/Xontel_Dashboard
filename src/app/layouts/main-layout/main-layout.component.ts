import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, map } from 'rxjs';
import { HomeComponent } from '../../pages/home/home.component';
import { SidebarService } from '../../shared/services/sidebar.service';
import { SideNavComponent } from '../../shared/side-nav/side-nav.component';
import { TopNavComponent } from '../../shared/top-nav/top-nav.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HomeComponent, TopNavComponent, SideNavComponent, AsyncPipe],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  isOpen$ = this.sidebarService.isOpen$;
  isLargeScreen = window.innerWidth >= 1024; // lg breakpoint

  constructor(private sidebarService: SidebarService) {
    // Handle window resize
    fromEvent(window, 'resize')
      .pipe(map(() => window.innerWidth >= 1024))
      .subscribe((isLarge) => {
        this.isLargeScreen = isLarge;
      });
  }

  ngOnInit() {}

  ngOnDestroy() {}

  closeSidebar() {
    this.sidebarService.toggle();
  }
}
