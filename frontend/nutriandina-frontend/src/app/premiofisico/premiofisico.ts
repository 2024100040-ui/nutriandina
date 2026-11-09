import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../menu/menu';
import { PremioFisico } from '../../model/nutriandina.model';

@Component({
  imports: [CommonModule, FormsModule, TableModule, DialogModule, MenuComponent],
  selector: 'app-premiofisico',
  styleUrl: './premiofisico.css',
  templateUrl: './premiofisico.html',
})
export class PremioFisicoComponent {

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  items: PremioFisico[] = [];
  verDialogo: boolean = false;
  premioFisico: PremioFisico = {} as PremioFisico;

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.api.GetPremioFisico().subscribe(x => {
      this.items = x;
      this.cdr.detectChanges();
    });
  }

  nuevo() {
    this.premioFisico = {} as PremioFisico;
    this.verDialogo = true;
  }

  editar(item: PremioFisico) {
    this.premioFisico = { ...item };
    this.verDialogo = true;
  }

  guardar() {
    if (this.premioFisico.id) {
      this.api.PutPremioFisico(this.premioFisico).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    } else {
      this.api.PostPremioFisico(this.premioFisico).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    }
  }

  eliminar(item: PremioFisico) {
    if (!item.id) return;
    this.api.DeletePremioFisico(item).subscribe(() => this.listar());
  }

}
