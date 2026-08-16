import QRCode from 'qrcode';

export function urlSitio(astroSite: URL | undefined): string {
  return (astroSite?.toString() ?? 'https://guillenuesch.netlify.app').replace(/\/$/, '');
}

export function urlParticipante(site: string, codigo: string): string {
  return `${site}/a/${codigo}`;
}

export async function qrDataUrl(texto: string, tamano = 480): Promise<string> {
  return QRCode.toDataURL(texto, {
    margin: 2,
    width: tamano,
    color: { dark: '#051229', light: '#ffffff' },
  });
}
