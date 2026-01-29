import { Component, inject, OnInit, signal } from '@angular/core';
import { TeamService } from '../../../core/services/team-service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewTeam } from '../new-team/new-team';
import { NewMember } from '../new-member/new-member';

@Component({
  selector: 'app-teams',
  imports: [AsyncPipe, DatePipe, RouterLink, NewTeam, NewMember],
  templateUrl: './teams.html',
  styleUrl: './teams.css'
})
export class TeamsComponent implements OnInit {
  private teamService = inject(TeamService);
  
  team$ = this.teamService.teams$
  isLoading = signal(false);
  showAddTeam = signal(false);
  showAddMember = signal(false);
  selectedTeamId = signal<number>(0);

  ngOnInit() {
    this.isLoading.set(true);
    this.teamService.getTeams().subscribe({
      next: () => this.isLoading.set(false),
      error: () => this.isLoading.set(false)
    });
  }
  
  openCreateTeamModal() {
    this.showAddTeam.set(true);
  }
  
  openAddMemberModal(teamId: number) {
    this.selectedTeamId.set(teamId);
    this.showAddMember.set(true);
  }
  

  closeTeamModal() {
    this.showAddTeam.set(false);
  }
  
  closeMemberModal() {
    this.showAddMember.set(false);
  }
}