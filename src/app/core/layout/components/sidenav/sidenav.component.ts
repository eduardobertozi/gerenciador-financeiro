import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MobileLayoutService } from '../../services/mobile-layout.service';
import { SidenavVisibilityStore } from '../../stores/sidenav-visibility.store';
import { SidenavItemsComponent } from './components/sidenav-items/sidenav-items.component';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatListModule, SidenavItemsComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  private readonly mobileLayoutService = inject(MobileLayoutService);
  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);

  isMobile = this.mobileLayoutService.isMobile();

  sidenavMode = computed(() => (this.isMobile() ? 'over' : 'side'));

  isSidenavOpened = computed(() => {
    if (!this.isMobile()) {
      return true;
    }

    return this.sidenavVisibilityStore.isVisible();
  });
}
