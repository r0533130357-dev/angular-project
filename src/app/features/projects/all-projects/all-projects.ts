import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects-service';

@Component({
  selector: 'app-all-projects',
  imports: [RouterLink,AsyncPipe,CommonModule],
  templateUrl: './all-projects.html',
  styleUrl: './all-projects.css',
})
export class AllProjects {
private projectsService=inject(ProjectsService);
projects$ = this.projectsService.projects$;
ngOnInit(): void {
  this.projectsService.getProjects().subscribe({
    error: (err) => console.error('שגיאה בטעינת פרויקטים:', err)
  });
}
}
