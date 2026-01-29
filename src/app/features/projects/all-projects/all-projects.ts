import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects-service';

@Component({
  selector: 'app-all-projects',
  standalone: true, 
  imports: [RouterLink, AsyncPipe, CommonModule],
  templateUrl: './all-projects.html',
  styleUrl: './all-projects.css',
})
export class AllProjects implements OnInit {
  private projectsService = inject(ProjectsService);
  projects$ = this.projectsService.projects$;

  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.projectsService.getProjects().subscribe({
      next: () => {
        this.isLoading.set(false); 
      },
      error: (err) => {
        console.error('שגיאה בטעינת פרויקטים:', err);
        this.isLoading.set(false); 
      }
    });
  }
}