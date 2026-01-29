import { Component, inject, Signal, signal } from '@angular/core';
import { TeamService } from '../../../core/services/team-service';
import { ProjectsService } from '../../../core/services/projects-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewProject } from '../new-project/new-project';

@Component({
  selector: 'app-project-list',
  imports: [CommonModule,RouterLink,NewProject],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
private projectsService=inject(ProjectsService);
projects$ = this.projectsService.projects$;
 showAddProject = signal<boolean>(false);
teamId = signal<number>(Number(location.pathname.split('/')[3]));
 
ngOnInit(): void {
  this.projectsService.getProjects().subscribe({
    error: (err) => console.error('שגיאה בטעינת פרויקטים:', err)
  });
}
CreateProject(): void { 
}
 openCreateProjectModal(): void {
    this.showAddProject.set(!this.showAddProject());
  }
}