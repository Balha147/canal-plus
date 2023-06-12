import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from 'src/app/shared/service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {


  private storageService = inject(StorageService);

  private route = inject(Router);

  navigateToMovies(): void {
    this.route.navigate(['movies']);
  }

  navigateToHistory(): void {
    this.route.navigate(['movies/history']);
  }

  logout(): void {
    this.storageService.clean();
    this.storageService.isLoggedIn();
    this.route.navigate(['login']);
  }
}
