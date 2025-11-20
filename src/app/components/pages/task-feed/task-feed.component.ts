import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { TaskCardComponent } from '../../shared/task-card/task-card.component';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskCardComponent],
  templateUrl: './task-feed.component.html',
  styleUrl: './task-feed.component.css'
})
export class TaskFeedComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  maxBudget: number = 1000;

  categories = [
    'All',
    'Errands',
    'Cleaning',
    'Pet Care',
    'Tutoring',
    'Handyman',
    'Transportation',
    'Yard Work',
    'Photography',
    'Moving'
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || this.selectedCategory === 'All' || task.category === this.selectedCategory;
      const matchesBudget = task.budget <= this.maxBudget;
      return matchesSearch && matchesCategory && matchesBudget;
    });
  }
}
