import { Component } from '@angular/core';
import { BugFormComponent } from './bug-form/bug-form.component';
import { BugListComponent } from './bug-list/bug-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BugFormComponent, BugListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
}
