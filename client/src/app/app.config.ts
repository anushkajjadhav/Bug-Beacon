import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BugFormComponent } from './bug-form/bug-form.component';
import { BugListComponent } from './bug-list/bug-list.component';
import { AppComponent } from './app.component';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter([]),
    importProvidersFrom(FormsModule),
    importProvidersFrom(CommonModule)
  ],
  standaloneComponents: [
    AppComponent,
    BugFormComponent,
    BugListComponent
  ]
};
