import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TaskComment } from '../models/model';
@Injectable({ providedIn: 'root' })
export class CommentsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/comments`;
  getComments(taskId: number): Observable<TaskComment[]> {
    return this.http.get<TaskComment[]>(`${this.apiUrl}?taskId=${taskId}`);
  }
  addComment(taskId: number, body: string): Observable<TaskComment> {
    return this.http.post<TaskComment>(this.apiUrl, { taskId, body });
  }
}