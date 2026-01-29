import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamService } from '../../../core/services/team-service';
import { Router } from '@angular/router';
import { LoginData } from '../../../core/models/model';

@Component({
  selector: 'app-new-team',
  imports: [ReactiveFormsModule],
  templateUrl: './new-team.html',
  styleUrl: './new-team.css',
})
export class NewTeam {  
private fb=inject(FormBuilder)
private teamService=inject(TeamService);
private router = inject(Router); 
AddTeamForm=this.fb.group({
  name:['',[Validators.required]]
})
// 
onSubmit(){
  if(this.AddTeamForm.valid){
    this.teamService.createTeam(this.AddTeamForm.value.name as string).subscribe({
       next: res => {
        console.log('Team added', res);
      },
      error: err => console.error(err)
    });
  }
}

}
