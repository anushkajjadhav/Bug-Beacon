import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BugService } from '../bug.service';

export interface Bug {
  _id?: string;
  title: string;
  description: string;
  status?: string;
  assignedTo?: string;
}

@Component({
  selector: 'app-bug-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss']
})
export class BugListComponent {
  bugs: Bug[] = [];
  statusFilter: string = '';

  constructor(private bugService: BugService) {
    this.bugService.bugs$.subscribe((bugs: Bug[]) => {
      this.bugs = bugs;
    });
  }

  filteredBugs(): Bug[] {
    if (!this.statusFilter) return this.bugs;
    return this.bugs.filter(bug => bug.status === this.statusFilter);
  }

  markResolved(bug: Bug): void {
    if (bug._id) {
      this.bugService.updateBug(bug._id, { status: 'Resolved' }).subscribe();
    }
  }
}
