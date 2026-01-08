import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavVisibilityStore {
  private state = signal(false);

  isVisible = computed(() => this.state());

  toggle(): void {
    this.state.update((current) => !current);
  }

  close(): void {
    this.state.set(false);
  }
}
