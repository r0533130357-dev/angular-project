import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../../core/services/tasks-service';
import { CreateTaskRequest } from '../../../core/models/model';
@Component({
  selector: 'app-new-tasks',
  imports: [ReactiveFormsModule],
  templateUrl: './new-tasks.html',
  styleUrl: './new-tasks.css',
})
export class NewTasks {
private fb = inject(FormBuilder);
  private tasksService = inject(TasksService);
  projectId = input.required<number>();

  addTaskForm = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    priority: ['medium', [Validators.required]],
    dueDate: ['']
  });

  onSubmit() {
    if (this.addTaskForm.valid) {
      const taskData: CreateTaskRequest = {
        projectId: this.projectId(),
        title: this.addTaskForm.value.title as string,
        description: this.addTaskForm.value.description || '',
        priority: this.addTaskForm.value.priority || 'medium',
        dueDate: this.addTaskForm.value.dueDate || undefined,
        status: 'todo' 
      };

      this.tasksService.createTask(taskData).subscribe({
        next: (res) => {
          console.log('Task added successfully', res);
        },
        error: (err) => console.error('Error adding task:', err)
      });
    }
  }
}
