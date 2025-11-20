import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { UserService } from '../../../services/user.service';
import { Task } from '../../../models/task.model';
import { BadgeComponent } from '../../shared/badge/badge.component';
import { TaskCardComponent } from '../../shared/task-card/task-card.component';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, RouterModule, BadgeComponent, TaskCardComponent],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit {
  task: Task | undefined;
  similarTasks: Task[] = [];
  applied: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.task = this.taskService.getTaskById(id);
      if (this.task) {
        this.similarTasks = this.taskService.getTasksByCategory(this.task.category)
          .filter(t => t.id !== this.task!.id)
          .slice(0, 3);
      }
    }
  }

  applyToTask(): void {
    if (this.task) {
      const currentUser = this.userService.getCurrentUser();
      if (currentUser) {
        this.taskService.applyToTask(this.task.id, {
          taskId: this.task.id,
          userId: currentUser.id,
          userName: currentUser.name,
          message: 'I would like to help with this task!'
        });
        this.applied = true;
      }
    }
  }
}
