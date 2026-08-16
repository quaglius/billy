export type FormatoCurso = 'encuentro' | 'taller' | 'programa';
export type VisibilidadInstancia = 'privada';
export type Modalidad = 'presencial' | 'virtual' | 'hibrida';
export type TipoActividad =
  | 'si_no'
  | 'seleccion_unica'
  | 'seleccion_multiple'
  | 'numero'
  | 'fecha'
  | 'texto_libre';
export type EstadoPost = 'borrador' | 'publicado';
export type EstadoInstancia = 'completado' | 'en curso' | 'próxima' | 'sin fecha';

export type Adjunto = { nombre: string; url: string };

export type Curso = {
  id: string;
  slug: string;
  titulo: string;
  descripcionCorta: string;
  descripcion: string;
  formato: FormatoCurso;
  duracionTexto: string;
  dirigidoA: string;
  objetivos: string[];
  temario: string[];
  imagenPortadaUrl: string | null;
  adjuntos: Adjunto[];
  publicado: boolean;
  creadoEn: Date;
  actualizadoEn: Date;
};

export type Empresa = {
  id: string;
  nombre: string;
  slug: string;
  rubro: string | null;
  logoUrl: string | null;
  contactoNombre: string | null;
  contactoEmail: string | null;
  contactoTelefono: string | null;
  notasInternas: string | null;
  creadoEn: Date;
};

export type Instancia = {
  id: string;
  cursoId: string;
  empresaId: string;
  tituloParticular: string | null;
  particularidades: string | null;
  visibilidad: VisibilidadInstancia;
  fechaInicio: Date | null;
  fechaFin: Date | null;
  modalidad: Modalidad | null;
  creadoEn: Date;
};

// Pregunta de un curso, con QR y código PERMANENTES: se imprime una vez y se reutiliza en
// todas las cursadas de ese curso, sin importar la organización o la fecha. `sesionDesde`
// marca desde cuándo cuentan las respuestas para la pantalla en vivo (ver "Renovar" en
// vivo.astro): al tocarlo se pone en `now()` y el conteo en vivo arranca de nuevo, pero el
// Observatorio sigue sumando TODO el historial, ignorando este campo.
export type Actividad = {
  id: string;
  cursoId: string;
  codigo: string;
  tipo: TipoActividad;
  consigna: string;
  opciones: string[] | null;
  orden: number;
  sesionDesde: Date;
  creadoEn: Date;
};

export type Post = {
  id: string;
  slug: string;
  titulo: string;
  bajada: string;
  cuerpoMd: string;
  imagenPortadaUrl: string | null;
  keywordPrincipal: string | null;
  estado: EstadoPost;
  archivado: boolean;
  publicadoEn: Date | null;
  creadoEn: Date;
};

// Banco de imágenes reutilizable en todo el admin (cursos, posts, empresas). `origen` marca
// si es una foto ya estática en /public (gratis, sirve siempre) o una subida por el admin,
// guardada comprimida como base64 adentro del propio documento de Firestore y servida por
// /img/[id].ts — sin Firebase Storage, que desde feb/2026 exige el plan Blaze con tarjeta.
export type ImagenBanco = {
  id: string;
  url: string;
  nombre: string;
  origen: 'estatica' | 'firestore';
  creadoEn: Date;
};

export type Testimonio = {
  id: string;
  cita: string;
  autorNombre: string | null;
  autorCargo: string | null;
  organizacion: string;
  esPlaceholder: boolean;
  orden: number;
};
