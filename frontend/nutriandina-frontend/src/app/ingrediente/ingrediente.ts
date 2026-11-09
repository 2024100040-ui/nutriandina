import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../menu/menu';
import { Ingrediente } from '../../model/nutriandina.model';

@Component({
  imports: [CommonModule, FormsModule, TableModule, DialogModule, FileUploadModule, MenuComponent],
  selector: 'app-ingrediente',
  styleUrl: './ingrediente.css',
  templateUrl: './ingrediente.html',
})
export class IngredienteComponent {

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  items: Ingrediente[] = [];
  verDialogo: boolean = false;
  ingrediente: Ingrediente = {} as Ingrediente;
  fotoSeleccionada: File | null = null;
  @ViewChild('fu') fu!: FileUpload;

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.api.GetIngrediente().subscribe(x => {
      this.items = x;
      this.cdr.detectChanges();
    });
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada =
      event.files && event.files.length > 0 ? event.files[0] : null;
  }

  nuevo() {
    this.ingrediente = {} as Ingrediente;
    this.fotoSeleccionada = null;
    this.fu?.clear();
    this.verDialogo = true;
  }

  editar(item: Ingrediente) {
    this.ingrediente = { ...item };
    this.fotoSeleccionada = null;
    this.fu?.clear();
    this.verDialogo = true;
  }

  guardar() {
    if (this.ingrediente.id) {
      this.api.PutIngredienteForm(this.ingrediente, this.fotoSeleccionada).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    } else {
      this.api.PostIngredienteForm(this.ingrediente, this.fotoSeleccionada).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    }
  }

  eliminar(item: Ingrediente) {
    if (!item.id) return;
    this.api.DeleteIngrediente(item).subscribe(() => this.listar());
  }

}