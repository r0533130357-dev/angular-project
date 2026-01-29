import { Component, inject, signal } from '@angular/core';
import { TasksService } from '../../../core/services/tasks-service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../core/models/model';
import { CommonModule } from '@angular/common';
import { NewTasks } from '../new-tasks/new-tasks';
import { UpdateTask } from '../update-task/update-task';
import { CommentsService } from '../../../core/services/comments-service';
import { CommentSection } from '../comment-section/comment-section';

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule,NewTasks,UpdateTask,CommentSection],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList {

  private tasksService = inject(TasksService);
  private route = inject(ActivatedRoute);

  tasks$ = this.tasksService.tasks$;
  projectId = signal<number>(0);

  showAddTask = signal<boolean>(false);
  showEditTask = signal<boolean>(false);
  selectedTask = signal<Task>({} as Task);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('projectId'));
    if (id) {
      this.projectId.set(id);
      this.tasksService.getTasks(id).subscribe({
      error: (err) => console.error('שגיאה בטעינת משימות:', err)
    });
    }
  }

  openCreateTaskModal(): void {
    this.showAddTask.set(!this.showAddTask());
  }

openEditTaskModal(task: Task): void {
  this.selectedTask.set(task);
  this.showEditTask.set(!this.showEditTask());
}



  deleteTask(id: number): void {
    if (confirm('האם את בטוחה שברצונך למחוק את המשימה?')) {
      this.tasksService.deleteTask(id).subscribe();
    }
  }

}
