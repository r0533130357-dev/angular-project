import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../../core/services/team-service';
import { RouterLink, Router } from '@angular/router'; // ייבוא ה-Router וה-RouterLink
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
  // הזרקות תמיד בתוך המחלקה (Class)
  private teamService = inject(TeamService);
  private router = inject(Router); 

  team$ = this.teamService.teams$;

  showAddTeam = signal<boolean>(false);
  showAddMember = signal<boolean>(false);
  selectedTeamId = signal<number>(1);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true); 
    this.teamService.getTeams().subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('שגיאה בטעינת צוותים:', err);
        this.isLoading.set(false); 
      }
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