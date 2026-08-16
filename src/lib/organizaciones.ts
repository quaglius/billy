export type MarcaOrg =
  | 'union'
  | 'rail'
  | 'energia'
  | 'salud'
  | 'escudo'
  | 'agua'
  | 'industria'
  | 'estado'
  | 'oil'
  | 'edificio';

export type Organizacion = {
  nombre: string;
  corto: string;
  color: string;
  marca: MarcaOrg;
  logo?: string;
};

export const ORGANIZACIONES: Organizacion[] = [
  { nombre: 'SITOS', corto: 'SITOS', color: '#0f3d2e', marca: 'agua', logo: '/marca/ejemplo/sitos.svg' },
  { nombre: 'Fundación Provincia ART', corto: 'Provincia ART', color: '#051229', marca: 'escudo', logo: '/marca/ejemplo/fundacion-provincia-art.svg' },
  { nombre: 'Trenes Argentinos Línea Roca', corto: 'Línea Roca', color: '#7a1020', marca: 'rail', logo: '/marca/ejemplo/linea-roca.svg' },
  { nombre: 'AECN (Asociación de Empleados de Casinos Nacionales)', corto: 'AECN', color: '#1a365d', marca: 'edificio', logo: '/marca/ejemplo/aecn.svg' },
  { nombre: 'AGOEC', corto: 'AGOEC', color: '#12344d', marca: 'union', logo: '/marca/ejemplo/agoec.svg' },
  { nombre: 'ARBA', corto: 'ARBA', color: '#0b4f8a', marca: 'estado', logo: '/marca/ejemplo/arba.svg' },
  { nombre: 'ASFA (Asociación de Señaleros de Ferrocarriles Argentinos)', corto: 'ASFA', color: '#1d3557', marca: 'rail', logo: '/marca/ejemplo/asfa.svg' },
  { nombre: 'Astilleros Río Santiago', corto: 'Astilleros', color: '#0e4d6c', marca: 'industria', logo: '/marca/ejemplo/astilleros.svg' },
  { nombre: 'Cablevisión', corto: 'Cablevisión', color: '#1b3a6b', marca: 'edificio', logo: '/marca/ejemplo/cablevision.svg' },
  { nombre: 'CEAMSE', corto: 'CEAMSE', color: '#1e5a3a', marca: 'industria', logo: '/marca/ejemplo/ceamse.svg' },
  { nombre: 'Coopelectric Olavarría', corto: 'Coopelectric', color: '#b45309', marca: 'energia', logo: '/marca/ejemplo/coopelectric.svg' },
  { nombre: 'EDEA S.A.', corto: 'EDEA', color: '#0369a1', marca: 'energia', logo: '/marca/ejemplo/edea.svg' },
  { nombre: 'Hospital Dr. Arturo Oñativia', corto: 'Htal. Oñativia', color: '#0f766e', marca: 'salud', logo: '/marca/ejemplo/hospital.svg' },
  { nombre: 'Hospital Interzonal El Cruce', corto: 'Htal. El Cruce', color: '#115e59', marca: 'salud', logo: '/marca/ejemplo/hospital-cruce.svg' },
  { nombre: 'Hospital Zonal Dr. Lúcio Meléndez', corto: 'Htal. Meléndez', color: '#134e4a', marca: 'salud', logo: '/marca/ejemplo/hospital-melendez.svg' },
  { nombre: 'Hospitales SAMIC', corto: 'SAMIC', color: '#155e75', marca: 'salud', logo: '/marca/ejemplo/samic.svg' },
  { nombre: 'La Fraternidad', corto: 'La Fraternidad', color: '#7f1d1d', marca: 'union', logo: '/marca/ejemplo/fraternidad.svg' },
  { nombre: 'Línea Belgrano Norte', corto: 'Belgrano Norte', color: '#1e3a5f', marca: 'rail', logo: '/marca/ejemplo/belgrano-norte.svg' },
  { nombre: 'Línea Belgrano Sur', corto: 'Belgrano Sur', color: '#172554', marca: 'rail', logo: '/marca/ejemplo/belgrano-sur.svg' },
  { nombre: 'Loterías y Casinos', corto: 'Loterías', color: '#4c1d95', marca: 'edificio', logo: '/marca/ejemplo/loterias.svg' },
  { nombre: 'Metrovías', corto: 'Metrovías', color: '#1e40af', marca: 'rail', logo: '/marca/ejemplo/metrovias.svg' },
  { nombre: 'Ministerio de Economía PBA', corto: 'Min. Economía', color: '#1e3a8a', marca: 'estado', logo: '/marca/ejemplo/economia-pba.svg' },
  { nombre: 'Obras Sanitarias Gral. Pueyrredón', corto: 'OSSE', color: '#0e7490', marca: 'agua', logo: '/marca/ejemplo/osse.svg' },
  { nombre: 'Peugeot Argentina', corto: 'Peugeot', color: '#1f2937', marca: 'industria', logo: '/marca/ejemplo/peugeot.svg' },
  { nombre: 'Registro de la Propiedad', corto: 'Registro', color: '#334155', marca: 'estado', logo: '/marca/ejemplo/registro.svg' },
  { nombre: 'Servicio Penitenciario (Batán)', corto: 'SPF Batán', color: '#44403c', marca: 'escudo', logo: '/marca/ejemplo/penitenciario.svg' },
  { nombre: 'SSP (Sindicato de Salud Pública PBA)', corto: 'SSP', color: '#14532d', marca: 'union', logo: '/marca/ejemplo/ssp.svg' },
  { nombre: 'TECSAN', corto: 'TECSAN', color: '#3f6212', marca: 'industria', logo: '/marca/ejemplo/tecsan.svg' },
  { nombre: 'Vialidad Nacional', corto: 'Vialidad', color: '#9a3412', marca: 'estado', logo: '/marca/ejemplo/vialidad.svg' },
  { nombre: 'YPF', corto: 'YPF', color: '#1d4ed8', marca: 'oil', logo: '/marca/ejemplo/ypf.svg' },
];
