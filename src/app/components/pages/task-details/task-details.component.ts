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
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: Task | undefined;
  similarTasks: Task[] = [];
  applied = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const idNum = Number(id);
    this.taskService.getTaskById(idNum).subscribe({
      next: (task) => {
        this.task = task;
        // fetch tasks and filter by category
        this.taskService.getTasks().subscribe({
          next: (tasks) => {
            this.similarTasks = tasks
              .filter(t => t.category === task.category && t.id !== task.id)
              .slice(0, 3);
          }
        });
      }
    });
  }

  applyToTask(): void {
    if (!this.task) return;

    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    const payload: any = {
      taskId: this.task.id,
      userId: currentUser.id,
      userName: currentUser.name,
      message: 'I would like to help with this task!'
    };

    this.taskService.applyToTask(Number(this.task.id), payload).subscribe({
      next: () => (this.applied = true)
    });
  }
}
