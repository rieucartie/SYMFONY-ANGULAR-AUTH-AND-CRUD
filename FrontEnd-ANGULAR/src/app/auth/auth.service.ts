import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from './credentials';
// ADRESSE URL
const USERS_API = environment.USERS_API;
const AUTH_API = environment.AUTH_API;

/**
 *  réponse par l'API d'authentification
 */
interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new Subject<boolean>();

  constructor(private http: HttpClient, private storage: Storage) {}

  register(account: { email: string; password: string; fullname: string }) {
    return this.http.post(USERS_API, account);
  }

  authenticate(credentials: Credentials) {
    return this.http.post(AUTH_API, credentials).pipe(
      map((resultat: AuthResponse) => {
        this.storage.setItem('token', resultat.token);
        this.authState.next(true);
        return resultat;
      })
    );
  }

  /**
   * Permet de déconnecter l'utilisateur
   */
  logout() {
    this.storage.removeItem('token');
    this.authState.next(false);
  }

  getToken(): string {
    return this.storage.getItem('token') || null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserData() {
    if (!this.getToken()) { return null; }
    return jwtDecode(this.getToken());
  }
}
