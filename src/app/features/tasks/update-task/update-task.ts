import { Component, inject, input, output, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../../core/services/tasks-service';
import { Task } from '../../../core/models/model';
@Component({
  selector: 'app-update-task',
  imports: [ReactiveFormsModule],
  templateUrl: './update-task.html',
  styleUrl: './update-task.css',
})
export class UpdateTask {
  private fb = inject(FormBuilder);
  private tasksService = inject(TasksService);

  task = input.required<Task>();
  editForm = this.fb.group({
    status: ['', Validators.required],
    priority: ['', Validators.required]
  });

  ngOnInit() {
    this.editForm.patchValue({
      status: this.task().status,
      priority: this.task().priority
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const { status, priority } = this.editForm.value;

      this.tasksService.updateTask( this.task().id,status as string,priority as string).subscribe({     
        error: (err) => console.error('שגיאה בעדכון:', err)
      });
    }
  }
}
