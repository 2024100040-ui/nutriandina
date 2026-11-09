import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table'; 
import { DialogModule } from 'primeng/dialog';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../menu/menu';
import { Comunidad, Establecimiento } from '../../model/nutriandina.model';

@Component({
  imports: [CommonModule, FormsModule, TableModule, DialogModule, MenuComponent],
  selector: 'app-comunidad',
  styleUrl: './comunidad.css',
  templateUrl: './comunidad.html',
})
export class ComunidadComponent {

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  items: Comunidad[] = [];
  establecimientos: Establecimiento[] = [];
  verDialogo: boolean = false;
  comunidad: Comunidad = {} as Comunidad;

  ngOnInit() {
    this.listar();
    this.api.GetEstablecimiento().subscribe(x => this.establecimientos = x);
  }

  listar() {
    this.api.GetComunidad().subscribe(x => {
      this.items = x;
      this.cdr.detectChanges();
    });
  }

  nuevo() {
    this.comunidad = {} as Comunidad;
    this.verDialogo = true;
  }

  editar(item: Comunidad) {
    this.comunidad = { ...item };
    this.verDialogo = true;
  }

  guardar() {
    if (this.comunidad.id) {
      this.api.PutComunidad(this.comunidad).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    } else {
      this.api.PostComunidad(this.comunidad).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    }
  }

  eliminar(item: Comunidad) {
    if (!item.id) return;
    this.api.DeleteComunidad(item).subscribe(() => this.listar());
  }

}
