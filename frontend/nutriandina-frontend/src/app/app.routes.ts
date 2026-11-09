import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { InicioComponent } from './inicio/inicio';
import { AuthGuard } from '../services/auth.guard';
import { EstablecimientoComponent } from './establecimiento/establecimiento';
import { ComunidadComponent } from './comunidad/comunidad';
import { NinoComponent } from './nino/nino';
import { InsigniaComponent } from './insignia/insignia';
import { PremioFisicoComponent } from './premiofisico/premiofisico';
import { IngredienteComponent } from './ingrediente/ingrediente';
import { PlatoComponent } from './plato/plato';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'establecimiento', component: EstablecimientoComponent, canActivate: [AuthGuard] },
  { path: 'comunidad', component: ComunidadComponent, canActivate: [AuthGuard] },
  { path: 'nino', component: NinoComponent, canActivate: [AuthGuard] },
  { path: 'insignia', component: InsigniaComponent, canActivate: [AuthGuard] },
  { path: 'premiofisico', component: PremioFisicoComponent, canActivate: [AuthGuard] },
  { path: 'ingrediente', component: IngredienteComponent, canActivate: [AuthGuard] },
  { path: 'plato', component: PlatoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
