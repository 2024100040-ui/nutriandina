import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    username: string;
    apellidos: string;
    nombres: string;
    rol: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthenticationToken {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/';

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + 'login/', { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  obtenerUsuario() {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }

  obtenerRol(): string | null {
    return this.obtenerUsuario()?.rol ?? null;
  }

  limpiarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'logout/', {}).pipe(tap(() => this.limpiarSesion()));
  }
}
