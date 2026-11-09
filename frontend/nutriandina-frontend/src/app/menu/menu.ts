import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationToken } from '../../services/auth.service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class MenuComponent {
  constructor(private router: Router, private autToken: AuthenticationToken) {}

  usuario: any = null;

  ngOnInit() {
    this.usuario = this.autToken.obtenerUsuario();
  }

  logout() {
    this.autToken.logout().subscribe({
      complete: () => this.router.navigate(['login']),
      error: () => { this.autToken.limpiarSesion(); this.router.navigate(['login']); }
    });
  }
}
