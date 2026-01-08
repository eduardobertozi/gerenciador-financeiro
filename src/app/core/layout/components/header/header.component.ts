import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { ToggleSidenavVisibilityComponent } from './toggle-sidenav-visibility/toggle-sidenav-visibility.component';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterLink, ToggleSidenavVisibilityComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
