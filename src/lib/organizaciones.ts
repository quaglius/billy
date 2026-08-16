export type Organizacion = {
  nombre: string;
  corto: string;
  logo?: string;
  fondoOscuro?: boolean;
};

export const ORGANIZACIONES: Organizacion[] = [
  { nombre: 'Sindicato de Trabajadores de Obras Sanitarias de Mar del Plata', corto: 'SITOS' },
  { nombre: 'Provincia ART S.A.', corto: 'Provincia ART', logo: '/marca/organizaciones/provincia-art.svg' },
  { nombre: 'Trenes Argentinos Operaciones — Línea Roca', corto: 'Línea Roca', logo: '/marca/organizaciones/linea-roca.png' },
  { nombre: 'Asociación de Empleados de Casinos Nacionales', corto: 'AECN' },
  { nombre: 'Asociación Gremial Obreros y Empleados de la Conservación Ecológica Ambiental y Servicios Especiales', corto: 'AGOEC', logo: '/marca/organizaciones/agoec.png' },
  { nombre: 'Agencia de Recaudación de la Provincia de Buenos Aires', corto: 'ARBA' },
  { nombre: 'Asociación Señaleros Ferroviarios Argentinos', corto: 'ASFA' },
  { nombre: 'Ente Administrador del Astillero Río Santiago', corto: 'Astillero Río Santiago', logo: '/marca/organizaciones/astillero-rio-santiago.png' },
  { nombre: 'Cablevisión Argentina — marca histórica', corto: 'Cablevisión', logo: '/marca/organizaciones/cablevision.svg' },
  { nombre: 'Coordinación Ecológica Área Metropolitana Sociedad del Estado', corto: 'CEAMSE', logo: '/marca/organizaciones/ceamse.svg' },
  { nombre: 'Coopelectric Olavarría', corto: 'Coopelectric', logo: '/marca/organizaciones/coopelectric.png' },
  { nombre: 'Empresa Distribuidora de Energía Atlántica S.A.', corto: 'EDEA', logo: '/marca/organizaciones/edea.png', fondoOscuro: true },
  { nombre: 'Hospital Zonal General de Agudos Dr. Arturo Oñativia', corto: 'Htal. Oñativia', logo: '/marca/organizaciones/hospital-onativia.jpg' },
  { nombre: 'Hospital de Alta Complejidad en Red El Cruce Dr. Néstor Carlos Kirchner S.A.M.I.C.', corto: 'Htal. El Cruce', logo: '/marca/organizaciones/hospital-el-cruce.png', fondoOscuro: true },
  { nombre: 'Hospital Zonal General de Agudos Dr. Lucio Meléndez', corto: 'Htal. Meléndez' },
  { nombre: 'Servicios de Atención Médica Integral para la Comunidad', corto: 'Hospitales SAMIC' },
  { nombre: 'Iglesia Evangélica Menonita Argentina', corto: 'IEMA' },
  { nombre: 'Sindicato de Conductores de Trenes La Fraternidad', corto: 'La Fraternidad', logo: '/marca/organizaciones/la-fraternidad.png' },
  { nombre: 'Línea Belgrano Norte — operada por Ferrovías S.A.C.', corto: 'Belgrano Norte', logo: '/marca/organizaciones/ferrovias.svg' },
  { nombre: 'Línea Belgrano Sur — Trenes Argentinos Operaciones', corto: 'Belgrano Sur', logo: '/marca/organizaciones/trenes-argentinos.svg' },
  { nombre: 'Instituto Provincial de Lotería y Casinos', corto: 'Loterías y Casinos', logo: '/marca/organizaciones/loterias-pba.webp' },
  { nombre: 'Metrovías S.A.', corto: 'Metrovías', logo: '/marca/organizaciones/metrovias.svg' },
  { nombre: 'Ministerio de Economía de la Provincia de Buenos Aires', corto: 'Min. Economía PBA', logo: '/marca/organizaciones/gba.svg', fondoOscuro: true },
  { nombre: 'Obras Sanitarias Sociedad de Estado — Municipalidad de General Pueyrredon', corto: 'OSSE', logo: '/marca/organizaciones/osse.png' },
  { nombre: 'Peugeot Argentina', corto: 'Peugeot', logo: '/marca/organizaciones/peugeot.svg' },
  { nombre: 'Dirección Provincial del Registro de la Propiedad', corto: 'Registro PBA', logo: '/marca/organizaciones/gba.svg', fondoOscuro: true },
  { nombre: 'Servicio Penitenciario Bonaerense — unidades de Batán', corto: 'SPB Batán', logo: '/marca/organizaciones/spb.png' },
  { nombre: 'Sindicato de Salud Pública de la Provincia de Buenos Aires', corto: 'SSP', logo: '/marca/organizaciones/ssp.svg' },
  { nombre: 'Tecsan Ingeniería Ambiental S.A.', corto: 'TECSAN', logo: '/marca/organizaciones/tecsan.svg' },
  { nombre: 'Dirección Nacional de Vialidad', corto: 'Vialidad Nacional', logo: '/marca/organizaciones/vialidad-nacional.png', fondoOscuro: true },
  { nombre: 'YPF S.A.', corto: 'YPF' },
];
