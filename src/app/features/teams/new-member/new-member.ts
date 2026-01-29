import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamService } from '../../../core/services/team-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-member',
  imports: [ReactiveFormsModule],
  templateUrl: './new-member.html',
  styleUrl: './new-member.css',
})
export class NewMember {
private fb=inject(FormBuilder)
private teamService=inject(TeamService); 
teamId = input.required<number>();
AddMemberForm=this.fb.group({
  userId:['',[Validators.required]]
})
// 
onSubmit(){
  if(this.AddMemberForm.valid){
    this.teamService.addMember(this.teamId(), Number(this.AddMemberForm.value.userId), 'member').subscribe({
       next: res => {
        console.log('Member added', res);
      },
      error: err => console.error(err)
    });
  }
}
}
