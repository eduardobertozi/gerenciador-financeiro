import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidenavItemsComponent } from './components/sidenav-items/sidenav-items.component';

@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    SidenavItemsComponent,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
