import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { map } from 'rxjs/internal/operators/map';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe,RouterOutlet,RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
private auth=inject(Auth);
userName$ = this.auth.currentUser$.pipe(
    map(user => user?.name || 'אורח')
  );
}