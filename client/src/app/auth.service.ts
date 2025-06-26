import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:5050/api/auth'; // adjust if needed

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(`${this.API}/login`, { username, password });
  }

  register(username: string, password: string) {
    return this.http.post(`${this.API}/register`, { username, password });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
