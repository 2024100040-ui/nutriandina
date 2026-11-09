import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationToken } from '../../services/auth.service';
import { MenuComponent } from '../menu/menu';

@Component({
  imports: [RouterLink, MenuComponent],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class InicioComponent {
  constructor(private autToken: AuthenticationToken) {}

  usuario: any = null;

  ngOnInit() {
    this.usuario = this.autToken.obtenerUsuario();
  }
}
