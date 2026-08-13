import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const input = join(root, 'src', 'assets', 'hero-consultoria.png');
const output = join(root, 'public', 'og.webp');

const overlay = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#011435" stop-opacity="1"/><stop offset="0.58" stop-color="#011435" stop-opacity="0.88"/><stop offset="1" stop-color="#011435" stop-opacity="0.18"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <text x="78" y="110" fill="#D7A451" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="4">ASESORÍA TRIBUTARIA ESTRATÉGICA</text>
    <text x="78" y="230" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="72" font-weight="800">Richard Agapito</text>
    <text x="78" y="320" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="58" font-weight="800">Decisiones firmes.</text>
    <text x="78" y="392" fill="#D7A451" font-family="Arial, sans-serif" font-size="58" font-weight="800">Riesgos bajo control.</text>
    <text x="78" y="495" fill="#FFFFFF" fill-opacity="0.75" font-family="Arial, sans-serif" font-size="25">Consultoría tributaria para empresas en Perú</text>
    <circle cx="101" cy="559" r="28" fill="none" stroke="#D7A451" stroke-width="2"/>
    <text x="101" y="568" text-anchor="middle" fill="#D7A451" font-family="Arial, sans-serif" font-size="18" font-weight="800">RA</text>
  </svg>`);

await sharp(input)
  .resize(1200, 630, { fit: 'cover', position: 'right' })
  .composite([{ input: overlay }])
  .webp({ quality: 84, effort: 5 })
  .toFile(output);

console.log(`Generated ${output}`);
