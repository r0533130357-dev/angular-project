import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../../core/services/team-service';
import { RouterLink } from '@angular/router';
import { NewTeam } from '../new-team/new-team';
import { NewMember } from "../new-member/new-member";

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, RouterLink, NewTeam, NewMember],
  templateUrl: './teams.html',
  styleUrl: './teams.css'
})
export class TeamsComponent implements OnInit {
 private teamService = inject(TeamService);
 team$ = this.teamService.teams$;

  showAddTeam = signal<boolean>(false);
showAddMember = signal<boolean>(false);
selectedTeamId = signal<number >(1);
  ngOnInit(): void {
    this.teamService.getTeams().subscribe({
      error: (err) => console.error('שגיאה בטעינת צוותים:', err)
    });
  }

  openCreateTeamModal(): void {
    this.showAddTeam.set(!this.showAddTeam());
  }
  openAddMemberModal(teamId: number): void {
    this.selectedTeamId.set(teamId);
    this.showAddMember.set(!this.showAddMember());
  }
}