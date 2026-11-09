import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../menu/menu';
import { Apoderado, Comunidad, Establecimiento, Nino } from '../../model/nutriandina.model';

@Component({
  imports: [CommonModule, FormsModule, TableModule, DialogModule, MenuComponent],
  selector: 'app-nino',
  styleUrl: './nino.css',
  templateUrl: './nino.html',
})
export class NinoComponent {

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  items: Nino[] = [];
  apoderados: Apoderado[] = [];
  comunidades: Comunidad[] = [];
  establecimientos: Establecimiento[] = [];
  verDialogo: boolean = false;
  nino: Nino = {} as Nino;

  ngOnInit() {
    this.listar();
    this.api.GetApoderado().subscribe(x => this.apoderados = x);
    this.api.GetComunidad().subscribe(x => this.comunidades = x);
    this.api.GetEstablecimiento().subscribe(x => this.establecimientos = x);
  }

  listar() {
    this.api.GetNino().subscribe(x => {
      this.items = x;
      this.cdr.detectChanges();
    });
  }

  nuevo() {
    this.nino = {} as Nino;
    this.verDialogo = true;
  }

  editar(item: Nino) {
    this.nino = { ...item };
    this.verDialogo = true;
  }

  guardar() {
    if (this.nino.id) {
      this.api.PutNino(this.nino).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    } else {
      this.api.PostNino(this.nino).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    }
  }

  eliminar(item: Nino) {
    if (!item.id) return;
    this.api.DeleteNino(item).subscribe(() => this.listar());
  }

}
