import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apoderado, Comunidad, Establecimiento, Ingrediente, Insignia, Nino, Plato, PremioFisico } from '../model/nutriandina.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private raizAPI = 'http://127.0.0.1:8000/api/';

  constructor(private cliente: HttpClient) {}

  // ===== ESTABLECIMIENTOS =====
  GetEstablecimiento(): Observable<Establecimiento[]> {
    return this.cliente.get<Establecimiento[]>(this.raizAPI + 'establecimiento/');
  }

  PostEstablecimiento(item: Establecimiento): Observable<Establecimiento> {
    return this.cliente.post<Establecimiento>(this.raizAPI + 'establecimiento/', item);
  }

  PutEstablecimiento(item: Establecimiento): Observable<Establecimiento> {
    return this.cliente.put<Establecimiento>(this.raizAPI + 'establecimiento/' + item.id + '/', item);
  }

  DeleteEstablecimiento(item: Establecimiento): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'establecimiento/' + item.id + '/');
  }

  // ===== COMUNIDADES =====
  GetComunidad(): Observable<Comunidad[]> {
    return this.cliente.get<Comunidad[]>(this.raizAPI + 'comunidad/');
  }

  PostComunidad(item: Comunidad): Observable<Comunidad> {
    return this.cliente.post<Comunidad>(this.raizAPI + 'comunidad/', item);
  }

  PutComunidad(item: Comunidad): Observable<Comunidad> {
    return this.cliente.put<Comunidad>(this.raizAPI + 'comunidad/' + item.id + '/', item);
  }

  DeleteComunidad(item: Comunidad): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'comunidad/' + item.id + '/');
  }

  // ===== NIÑOS =====
  GetNino(): Observable<Nino[]> {
    return this.cliente.get<Nino[]>(this.raizAPI + 'nino/');
  }

  PostNino(item: Nino): Observable<Nino> {
    return this.cliente.post<Nino>(this.raizAPI + 'nino/', item);
  }

  PutNino(item: Nino): Observable<Nino> {
    return this.cliente.put<Nino>(this.raizAPI + 'nino/' + item.id + '/', item);
  }

  DeleteNino(item: Nino): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'nino/' + item.id + '/');
  }

  // ===== INSIGNIAS =====
  GetInsignia(): Observable<Insignia[]> {
    return this.cliente.get<Insignia[]>(this.raizAPI + 'insignia/');
  }

  PostInsignia(item: Insignia): Observable<Insignia> {
    return this.cliente.post<Insignia>(this.raizAPI + 'insignia/', item);
  }

  PutInsignia(item: Insignia): Observable<Insignia> {
    return this.cliente.put<Insignia>(this.raizAPI + 'insignia/' + item.id + '/', item);
  }

  DeleteInsignia(item: Insignia): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'insignia/' + item.id + '/');
  }

  // ===== PREMIOS FÍSICOS =====
  GetPremioFisico(): Observable<PremioFisico[]> {
    return this.cliente.get<PremioFisico[]>(this.raizAPI + 'premio_fisico/');
  }

  PostPremioFisico(item: PremioFisico): Observable<PremioFisico> {
    return this.cliente.post<PremioFisico>(this.raizAPI + 'premio_fisico/', item);
  }

  PutPremioFisico(item: PremioFisico): Observable<PremioFisico> {
    return this.cliente.put<PremioFisico>(this.raizAPI + 'premio_fisico/' + item.id + '/', item);
  }

  DeletePremioFisico(item: PremioFisico): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'premio_fisico/' + item.id + '/');
  }

  // ===== INGREDIENTES =====
  GetIngrediente(): Observable<Ingrediente[]> {
    return this.cliente.get<Ingrediente[]>(this.raizAPI + 'ingrediente/');
  }

  PostIngrediente(item: Ingrediente): Observable<Ingrediente> {
    return this.cliente.post<Ingrediente>(this.raizAPI + 'ingrediente/', item);
  }

  PutIngrediente(item: Ingrediente): Observable<Ingrediente> {
    return this.cliente.put<Ingrediente>(this.raizAPI + 'ingrediente/' + item.id + '/', item);
  }

  DeleteIngrediente(item: Ingrediente): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'ingrediente/' + item.id + '/');
  }

  PostIngredienteForm(item: Ingrediente, foto: File | null): Observable<Ingrediente> {
    return this.cliente.post<Ingrediente>(
      this.raizAPI + 'ingrediente/', this.armarFormIngrediente(item, foto));
  }

  PutIngredienteForm(item: Ingrediente, foto: File | null): Observable<Ingrediente> {
    return this.cliente.put<Ingrediente>(
      this.raizAPI + 'ingrediente/' + item.id + '/', this.armarFormIngrediente(item, foto));
  }

  private armarFormIngrediente(item: Ingrediente, foto: File | null): FormData {
    const formData = new FormData();
    formData.append('nombre', item.nombre);
    formData.append('tipo_hierro', item.tipo_hierro ?? 'SIN_HIERRO');
    (item.no_combinar_con ?? []).forEach(id =>
      formData.append('no_combinar_con', String(id)));
    if (foto) {
      formData.append('foto', foto, foto.name);
    }
    return formData;
  }

  // ===== PLATOS =====
  GetPlato(): Observable<Plato[]> {
    return this.cliente.get<Plato[]>(this.raizAPI + 'plato/');
  }

  PostPlato(item: Plato): Observable<Plato> {
    return this.cliente.post<Plato>(this.raizAPI + 'plato/', item);
  }

  PutPlato(item: Plato): Observable<Plato> {
    return this.cliente.put<Plato>(this.raizAPI + 'plato/' + item.id + '/', item);
  }

  DeletePlato(item: Plato): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'plato/' + item.id + '/');
  }

  // ===== APODERADOS (solo lectura) =====
  GetApoderado(): Observable<Apoderado[]> {
    return this.cliente.get<Apoderado[]>(this.raizAPI + 'apoderado/');
  }
}