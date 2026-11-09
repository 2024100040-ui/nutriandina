import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../menu/menu';
import { Ingrediente, Plato } from '../../model/nutriandina.model';

@Component({
  imports: [CommonModule, FormsModule, TableModule, DialogModule, MenuComponent],
  selector: 'app-plato',
  styleUrl: './plato.css',
  templateUrl: './plato.html',
})
export class PlatoComponent {

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  items: Plato[] = [];
  ingredientes: Ingrediente[] = [];
  verDialogo: boolean = false;
  plato: Plato = {} as Plato;

  ngOnInit() {
    this.listar();
    this.api.GetIngrediente().subscribe(x => this.ingredientes = x);
  }

  listar() {
    this.api.GetPlato().subscribe(x => {
      this.items = x;
      this.cdr.detectChanges();
    });
  }

  nuevo() {
    this.plato = {} as Plato;
    this.verDialogo = true;
  }

  editar(item: Plato) {
    this.plato = { ...item };
    this.verDialogo = true;
  }

  guardar() {
    if (this.plato.id) {
      this.api.PutPlato(this.plato).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    } else {
      this.api.PostPlato(this.plato).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    }
  }

  eliminar(item: Plato) {
    if (!item.id) return;
    this.api.DeletePlato(item).subscribe(() => this.listar());
  }

}
