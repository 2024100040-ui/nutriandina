import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../menu/menu';
import { Establecimiento } from '../../model/nutriandina.model';

@Component({
  imports: [CommonModule, FormsModule, TableModule, DialogModule, MenuComponent],
  selector: 'app-establecimiento',
  styleUrl: './establecimiento.css',
  templateUrl: './establecimiento.html',
})
export class EstablecimientoComponent {

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  items: Establecimiento[] = [];
  verDialogo: boolean = false;
  establecimiento: Establecimiento = {} as Establecimiento;

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.api.GetEstablecimiento().subscribe(x => {
      this.items = x;
      this.cdr.detectChanges();
    });
  }

  nuevo() {
    this.establecimiento = {} as Establecimiento;
    this.verDialogo = true;
  }

  editar(item: Establecimiento) {
    this.establecimiento = { ...item };
    this.verDialogo = true;
  }

  guardar() {
    if (this.establecimiento.id) {
      this.api.PutEstablecimiento(this.establecimiento).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    } else {
      this.api.PostEstablecimiento(this.establecimiento).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    }
  }

  eliminar(item: Establecimiento) {
    if (!item.id) return;
    this.api.DeleteEstablecimiento(item).subscribe(() => this.listar());
  }

}
