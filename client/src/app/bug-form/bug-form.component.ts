import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BugService, Bug } from '../bug.service';

@Component({
  selector: 'app-bug-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.scss']
})
export class BugFormComponent {
  newBug: Bug = {
    title: '',
    description: '',
    assignedTo: ''
  };

  constructor(private bugService: BugService) {}

  submitBug(): void {
    if (this.newBug.title && this.newBug.description) {
      this.bugService.addBug(this.newBug).subscribe(() => {
        this.newBug = { title: '', description: '', assignedTo: '' };
      });
    }
  }
}
