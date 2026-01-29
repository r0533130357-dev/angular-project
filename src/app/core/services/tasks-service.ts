import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateTaskRequest, Task } from '../models/model'; 

@Injectable({ providedIn: 'root' })
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tasks`;

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  getTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?projectId=${projectId}`).pipe(
      tap(tasks => this.tasksSubject.next(tasks))
    );
  }

createTask(taskData: CreateTaskRequest): Observable<Task> {
  return this.http.post<Task>(this.apiUrl, taskData).pipe(
    tap(newTask => {
      const current = this.tasksSubject.getValue();
      this.tasksSubject.next([...current, newTask]);
    })
  );
}

  updateTask(id: number, status: string, priority: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { status, priority }).pipe(
      tap(updatedTask => {
        const currentTasks = this.tasksSubject.getValue();
        const index = currentTasks.findIndex(t => t.id === id);
        if (index !== -1) {
          currentTasks[index] = updatedTask;
          this.tasksSubject.next([...currentTasks]);
        }
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentTasks = this.tasksSubject.getValue();
        this.tasksSubject.next(currentTasks.filter(t => t.id !== id));
      })
    );
  }
}


