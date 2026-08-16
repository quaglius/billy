// Popup de QR grande + descarga como imagen (QR + pregunta + código), reutilizable en
// cualquier pantalla del admin que tenga un <dialog id="qr-dialog"> y botones con
// data-qr-abrir / data-qr-descargar + data-consigna/data-codigo/data-link/data-qr.
(function () {
  const dialog = document.getElementById('qr-dialog');
  const dImg = document.getElementById('qr-dialog-img');
  const dConsigna = document.getElementById('qr-dialog-consigna');
  const dCodigo = document.getElementById('qr-dialog-codigo');
  const dUrl = document.getElementById('qr-dialog-url');

  document.querySelectorAll('[data-qr-abrir]').forEach((el) => {
    el.addEventListener('click', () => {
      if (!dialog || !dImg) return;
      dImg.src = el.dataset.qr || '';
      dImg.alt = `QR para participar: ${el.dataset.consigna || ''}`;
      if (dConsigna) dConsigna.textContent = el.dataset.consigna || '';
      if (dCodigo) dCodigo.textContent = el.dataset.codigo || '';
      if (dUrl) dUrl.textContent = (el.dataset.link || '').replace(/^https?:\/\//, '');
      dialog.showModal();
    });
  });

  document.querySelectorAll('[data-qr-cerrar]').forEach((el) => {
    el.addEventListener('click', () => dialog && dialog.close());
  });
  if (dialog) {
    dialog.addEventListener('click', (ev) => {
      if (ev.target === dialog) dialog.close();
    });
  }

  function wrapText(ctx, texto, maxWidth) {
    const palabras = texto.split(/\s+/);
    const lineas = [];
    let actual = '';
    for (const palabra of palabras) {
      const prueba = actual ? `${actual} ${palabra}` : palabra;
      if (ctx.measureText(prueba).width > maxWidth && actual) {
        lineas.push(actual);
        actual = palabra;
      } else {
        actual = prueba;
      }
    }
    if (actual) lineas.push(actual);
    return lineas;
  }

  async function descargar(el) {
    const qrSrc = el.dataset.qr || '';
    const consigna = el.dataset.consigna || '';
    const codigo = el.dataset.codigo || '';
    const link = (el.dataset.link || '').replace(/^https?:\/\//, '');
    if (!qrSrc) return;

    const img = new Image();
    img.src = qrSrc;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const W = 1080;
    const H = 1350;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#051229';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#0075ff';
    ctx.font = '700 32px Lato, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PARTICIPÁ', W / 2, 110);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 46px "Libre Franklin", sans-serif';
    const lineas = wrapText(ctx, consigna, W - 160).slice(0, 4);
    let y = 200;
    for (const linea of lineas) {
      ctx.fillText(linea, W / 2, y);
      y += 58;
    }

    const qrSize = 640;
    const qrX = (W - qrSize) / 2;
    const qrY = Math.max(y + 40, 420);
    const pad = 32;
    ctx.fillStyle = '#ffffff';
    const r = 24;
    const bx = qrX - pad;
    const by = qrY - pad;
    const bw = qrSize + pad * 2;
    const bh = qrSize + pad * 2;
    ctx.beginPath();
    ctx.moveTo(bx + r, by);
    ctx.arcTo(bx + bw, by, bx + bw, by + bh, r);
    ctx.arcTo(bx + bw, by + bh, bx, by + bh, r);
    ctx.arcTo(bx, by + bh, bx, by, r);
    ctx.arcTo(bx, by, bx + bw, by, r);
    ctx.closePath();
    ctx.fill();
    ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

    const codeY = by + bh + 90;
    ctx.fillStyle = '#0075ff';
    ctx.font = '700 64px "Libre Franklin", sans-serif';
    ctx.fillText(codigo, W / 2, codeY);

    ctx.fillStyle = '#a9b0b8';
    ctx.font = '400 26px Lato, sans-serif';
    ctx.fillText(link, W / 2, codeY + 50);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${codigo}-qr.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  document.querySelectorAll('[data-qr-descargar]').forEach((el) => {
    el.addEventListener('click', () => descargar(el));
  });
})();
