export interface Usuario { id: number; username: string; email: string; nombres: string; apellidos: string; dni: string; rol: string; is_active: boolean; }
export interface Establecimiento { id: number; codigo_renipress: string; nombre: string; direccion: string; }
export interface Comunidad { id: number; nombre: string; establecimiento: number; establecimiento_nombre: string; }
export interface Apoderado { id: number; usuario: number; telefono: string; consentimiento: boolean; fecha_consentimiento: string | null; nombres: string; apellidos: string; }
export interface PersonalSalud { id: number; usuario: number; cargo: string; establecimiento: number; }
export interface Nino { id: number; nombres: string; apellidos: string; dni: string; fecha_nacimiento: string; sexo: string; apoderado: number; comunidad: number; establecimiento: number; comunidad_nombre: string; establecimiento_nombre: string; edad_meses: number; }
export interface Insignia { id: number; nombre: string; descripcion: string; semanas_racha: number; }
export interface InsigniaObtenida { id: number; apoderado: number; insignia: number; fecha_obtenida: string; }
export interface PremioFisico { id: number; nombre: string; descripcion: string; semanas_requeridas: number; }
export interface PremioEntregado { id: number; apoderado: number; personal: number | null; premio: number; fecha_otorgado: string; estado: string; fecha_entrega: string | null; }
export interface Ingrediente { id: number; nombre: string; tipo_hierro: string; no_combinar_con: number[]; tiene_hierro: boolean; foto: string | null; }
export interface Plato { id: number; nombre: string; descripcion: string; ingredientes: number[]; }
export interface RegistroAlimentacion { id: number; nino: number; fecha: string; foto_url: string; }
export interface DetalleAlimentacion { id: number; registro: number; momento: string; plato: number; ingredientes: number[]; }
export interface RegistroSuplemento { id: number; nino: number; fecha: string; administrado: boolean; }
export interface Control { id: number; nino: number; personal: number; fecha_programada: string; fecha_realizada: string | null; asistio: boolean; hemoglobina: number | null; observaciones: string; }
export interface Recordatorio { id: number; control: number; canal: string; fecha_envio: string | null; estado: string; }
export interface EvaluacionSemanal { id: number; nino: number; fecha_inicio_semana: string; dias_suplemento: number; dias_alimentacion: number; promedio_redondeado: number; nivel: string; }
export interface Alerta { id: number; nino: number; personal: number | null; tipo: string; fecha_generada: string; estado: string; fecha_atencion: string | null; }
