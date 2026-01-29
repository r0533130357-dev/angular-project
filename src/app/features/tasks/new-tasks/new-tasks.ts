import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../../core/services/tasks-service';
import { CreateTaskRequest } from '../../../core/models/model';
@Component({
  selector: 'app-new-tasks',
  imports: [ReactiveFormsModule],
  templateUrl: './new-tasks.html',
  styleUrl: './new-tasks.css'
})
export class NewTasks {
  private fb = inject(FormBuilder);
  private tasksService = inject(TasksService);
  
  projectId = input.required<number>();
  close = output<void>();
  
  addTaskForm = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    priority: ['medium'],
    dueDate: [''],
    assignedTo: ['']
  })
  
  onSubmit() {
    if (this.addTaskForm.valid) {
      this.closeModal();
      const taskData = {
        title: this.addTaskForm.value.title as string,
        description: this.addTaskForm.value.description as string,
        priority: this.addTaskForm.value.priority as string,
        due_date: this.addTaskForm.value.dueDate as string,
        projectId: this.projectId(),
        assigneeId: Number(this.addTaskForm.value.assignedTo) 
      };
      
      this.tasksService.createTask(taskData as CreateTaskRequest).subscribe({
        next: res => {
          console.log('Task created', res);
        },
        error: err => console.error(err)
      });
    }
  }
  
  closeModal() {
    this.close.emit();
  }
}