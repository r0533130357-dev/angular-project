import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, tap, Observable, map } from 'rxjs';
import { Project, ProjectRequest } from '../models/model';
@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/projects`;
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  projects$ = this.projectsSubject.asObservable();

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      tap(projects => this.projectsSubject.next(projects))
    );
  }

  getProjectsByTeam(teamId: number): Observable<Project[]> {
    return this.projects$.pipe(
      map(projects => projects.filter(p => p.team_id === teamId))
    );
  }
  createProject(project: ProjectRequest): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project).pipe(
      tap(newProject => {
        const currentProjects = this.projectsSubject.getValue();
        this.projectsSubject.next([...currentProjects, newProject]);
      })
    );
  }
}
