import { LogoutFacadeService } from '@/app/core/auth/facades/logout-facade.service';
import { LoggedInUserStoreService } from '@/app/core/auth/stores/logged-in-user-store.service';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterLink, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly logoutFacadeService = inject(LogoutFacadeService);
  private readonly router = inject(Router);
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);

  isLoggedIn = computed(() => this.loggedInUserStoreService.isLoggedIn());

  logout() {
    this.logoutFacadeService.logout().subscribe({
      next: () => {
        this.router.navigate(['auth', 'login']);
      },
    });
  }
}
