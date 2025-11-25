import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // ⬅️ أضفها هنا
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/task.model';
import { BadgeComponent } from '../../shared/badge/badge.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, BadgeComponent], // ⬅️ وزيدها هنا
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: User | null = null;
  editableUser: User = {} as User;
  skillsText: string = "";
  editMode = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();

    if (this.user) {
      this.editableUser = { ...this.user };
      this.skillsText = this.user.skills?.join(', ') ?? "";
    }
  }

  enableEdit() {
    this.editMode = true;
  }

  save() {
    this.editableUser.skills = this.skillsText
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.userService.updateUser(this.editableUser).subscribe(() => {
      this.user = { ...this.editableUser };
      this.editMode = false;
      this.userService.setCurrentUser(this.user);
    });
  }

  cancel() {
    this.editMode = false;
    this.editableUser = { ...this.user! };
    this.skillsText = this.user?.skills?.join(', ') ?? "";
  }
}
