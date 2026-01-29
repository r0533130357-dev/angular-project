import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Team } from '../models/model';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/teams`;

  private teamsSubject = new BehaviorSubject<Team[]>([]);

  teams$ = this.teamsSubject.asObservable();

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl).pipe(
      tap(teams => this.teamsSubject.next(teams))
    );
  }



  createTeam(name: string): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, { name }).pipe(
      tap(newTeam => {
        const currentTeams = this.teamsSubject.getValue();
        this.teamsSubject.next([...currentTeams, newTeam]);
      })
    );
  }
addMember(teamId: number, userId: number, role: string): Observable<any> {
  const url = `${this.apiUrl}/${teamId}/members`;
  const body = { userId, role };
  return this.http.post<any>(url, body).pipe(
    tap(() => {
      this.updateMemberCountLocally(teamId);
    })
  );
}

private updateMemberCountLocally(teamId: number) {
  const currentTeams = this.teamsSubject.getValue();
  const updatedTeams = currentTeams.map(team => {
    if (team.id === teamId) {
      return { ...team, members_count: (team.members_count || 0) + 1 };
    }
    return team;
  });
  this.teamsSubject.next(updatedTeams);
}
}