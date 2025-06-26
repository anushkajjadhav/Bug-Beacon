import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BugService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    };
  }

  getBugs() {
    return this.http.get('/api/bugs', this.getAuthHeaders());
  }

  addBug(bug: any) {
    return this.http.post('/api/bugs', bug, this.getAuthHeaders());
  }

  updateBug(id: string, update: any) {
    return this.http.patch(`/api/bugs/${id}`, update, this.getAuthHeaders());
  }
}
