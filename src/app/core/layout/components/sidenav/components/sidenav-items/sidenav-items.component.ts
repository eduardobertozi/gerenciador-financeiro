import { LoggedInUserStoreService } from '@/app/core/auth/stores/logged-in-user-store.service';
import { SidenavVisibilityStore } from '@/app/core/layout/stores/sidenav-visibility.store';
import { Component, computed, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav-items',
  imports: [MatSidenavModule, MatListModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
})
export class SidenavItemsComponent {
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);
  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);

  isLoggedIn = computed(() => this.loggedInUserStoreService.isLoggedIn());

  links = signal([
    {
      label: 'Home',
      url: '/',
    },
  ]);

  closeSidenav(): void {
    this.sidenavVisibilityStore.close();
  }
}
