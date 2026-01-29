import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamService } from '../../../core/services/team-service';

@Component({
  selector: 'app-new-team',
  imports: [ReactiveFormsModule],
  templateUrl: './new-team.html',
  styleUrl: './new-team.css'
})
export class NewTeam {
  private fb = inject(FormBuilder);
  private teamService = inject(TeamService);
  
  close = output<void>();
  
  AddTeamForm = this.fb.group({
    name: ['', [Validators.required]]
  })
  
  onSubmit() {
    if (this.AddTeamForm.valid) {
      this.teamService.createTeam(this.AddTeamForm.value.name as string).subscribe({
        next: res => {
          console.log('Team created', res);
          this.closeModal();
        },
        error: err => console.error(err)
      });
    }
  }
  
  closeModal() {
    this.close.emit();
  }
}