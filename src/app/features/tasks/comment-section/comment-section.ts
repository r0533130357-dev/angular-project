import { Component, inject, input, signal } from '@angular/core';
import { CommentsService } from '../../../core/services/comments-service';
import { TaskComment } from '../../../core/models/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-section.html',
  styleUrl: './comment-section.css',
})
export class CommentSection {
  private commentsService = inject(CommentsService);

  taskId = input.required<number>(); 
  comments = signal<TaskComment[]>([]);
  newCommentBody = signal<string>('');

  ngOnInit() {
    this.commentsService.getComments(this.taskId()).subscribe(res => {
      this.comments.set(res);
    });
  }



  postComment() {
    if (!this.newCommentBody().trim()) return;

    this.commentsService.addComment(this.taskId(), this.newCommentBody()).subscribe(newComment => {
      this.comments.update(prev => [...prev, newComment]);
      this.newCommentBody.set('');
    });
  }
}
