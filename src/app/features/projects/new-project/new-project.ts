import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamService } from '../../../core/services/team-service';
import { Router } from '@angular/router';
import { LoginData } from '../../../core/models/model';
import { ProjectsService } from '../../../core/services/projects-service';

@Component({
  selector: 'app-new-project',
  imports: [ReactiveFormsModule],
  templateUrl: './new-project.html',
  styleUrl: './new-project.css',
})
export class NewProject {  
private fb=inject(FormBuilder)
private teamService=inject(ProjectsService);
private router = inject(Router); 

 teamId = Number(this.router.url.split('/')[3]);
AddProjectForm=this.fb.group({
  name:['',[Validators.required]],
  discription:['']
})
// 
onSubmit(){
  console.log('Team ID:', this.teamId);
  if(this.AddProjectForm.valid){
    this.teamService.createProject({name: this.AddProjectForm.value.name as string, discription: this.AddProjectForm.value.discription as string,teamId: this.teamId}).subscribe({
       next: res => {
        console.log('Project added', res);
      },
      error: err => console.error(err)
    });
  }
}

}
