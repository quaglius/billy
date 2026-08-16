import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const html = pathToFileURL(join(here, 'slides.html')).href;
const out = join(here, 'export');
await mkdir(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1400, height: 2200 },
  deviceScaleFactor: 1,
});
await page.goto(html, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  await Promise.all(
    [...document.images].map((img) =>
      img.complete ? null : new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      }),
    ),
  );
  await document.fonts.ready;
});

const slides = await page.$$('.slide');
for (const slide of slides) {
  const file = await slide.getAttribute('data-file');
  if (!file) continue;
  await slide.scrollIntoViewIfNeeded();
  await slide.screenshot({ path: join(out, `${file}.png`), type: 'png' });
  console.log('ok', file);
}

await browser.close();
