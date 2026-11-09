import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../menu/menu';
import { Insignia } from '../../model/nutriandina.model';

@Component({
  imports: [CommonModule, FormsModule, TableModule, DialogModule, MenuComponent],
  selector: 'app-insignia',
  styleUrl: './insignia.css',
  templateUrl: './insignia.html',
})
export class InsigniaComponent {

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  items: Insignia[] = [];
  verDialogo: boolean = false;
  insignia: Insignia = {} as Insignia;

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.api.GetInsignia().subscribe(x => {
      this.items = x;
      this.cdr.detectChanges();
    });
  }

  nuevo() {
    this.insignia = {} as Insignia;
    this.verDialogo = true;
  }

  editar(item: Insignia) {
    this.insignia = { ...item };
    this.verDialogo = true;
  }

  guardar() {
    if (this.insignia.id) {
      this.api.PutInsignia(this.insignia).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    } else {
      this.api.PostInsignia(this.insignia).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    }
  }

  eliminar(item: Insignia) {
    if (!item.id) return;
    this.api.DeleteInsignia(item).subscribe(() => this.listar());
  }

}
