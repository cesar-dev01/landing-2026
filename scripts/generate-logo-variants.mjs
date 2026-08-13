import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(?:[A-Za-z]:)/, (value) => value.slice(1));
const input = join(root, 'public', 'brand', 'logo-reference.jpg');
const output = join(root, 'public', 'brand');
const navy = { r: 8, g: 24, b: 64 };
const white = { r: 255, g: 255, b: 255 };
const black = { r: 12, g: 16, b: 24 };

await mkdir(output, { recursive: true });

async function solidLogo({ crop, color = navy, width }) {
  let source = sharp(input);
  if (crop) source = source.extract(crop);

  const { data, info } = await source.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);

  for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
    const sourceIndex = pixel * info.channels;
    const outputIndex = pixel * 4;
    const luminance =
      data[sourceIndex] * 0.2126 + data[sourceIndex + 1] * 0.7152 + data[sourceIndex + 2] * 0.0722;
    const alpha = Math.round(Math.max(0, Math.min(1, (244 - luminance) / 120)) * 255);

    rgba[outputIndex] = color.r;
    rgba[outputIndex + 1] = color.g;
    rgba[outputIndex + 2] = color.b;
    rgba[outputIndex + 3] = alpha;
  }

  return sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 4 })
    .resize({ width, kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
}

async function placeOnBackground(buffer, { width, height, background, padding = 80 }) {
  const logo = await sharp(buffer)
    .resize({
      width: width - padding * 2,
      height: height - padding * 2,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  const metadata = await sharp(logo).metadata();

  return sharp({ create: { width, height, channels: 4, background } })
    .composite([
      {
        input: logo,
        left: Math.round((width - metadata.width) / 2),
        top: Math.round((height - metadata.height) / 2),
      },
    ])
    .png()
    .toBuffer();
}

async function horizontalLogo(color, background) {
  const symbol = await solidLogo({
    crop: { left: 55, top: 4, width: 185, height: 268 },
    color,
    width: 250,
  });
  const wordmark = await solidLogo({
    crop: { left: 8, top: 276, width: 296, height: 70 },
    color,
    width: 980,
  });
  const canvas = { width: 1500, height: 460 };
  const symbolMeta = await sharp(symbol).metadata();
  const wordmarkMeta = await sharp(wordmark).metadata();

  return sharp({ create: { ...canvas, channels: 4, background } })
    .composite([
      { input: symbol, left: 90, top: Math.round((canvas.height - symbolMeta.height) / 2) },
      { input: wordmark, left: 410, top: Math.round((canvas.height - wordmarkMeta.height) / 2) },
    ])
    .png()
    .toBuffer();
}

async function vectorizeAlpha(buffer, { color = '#ffffff', threshold = 96 } = {}) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const filled = new Uint8Array(info.width * info.height);
  const stride = info.width + 1;
  const edges = new Map();

  for (let index = 0; index < filled.length; index += 1) {
    filled[index] = data[index * 4 + 3] >= threshold ? 1 : 0;
  }

  const isFilled = (x, y) =>
    x >= 0 && y >= 0 && x < info.width && y < info.height && filled[y * info.width + x] === 1;
  const pointKey = (x, y) => y * stride + x;
  const addEdge = (x1, y1, x2, y2) => {
    const start = pointKey(x1, y1);
    const list = edges.get(start) ?? [];
    list.push(pointKey(x2, y2));
    edges.set(start, list);
  };

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      if (!isFilled(x, y)) continue;
      if (!isFilled(x, y - 1)) addEdge(x, y, x + 1, y);
      if (!isFilled(x + 1, y)) addEdge(x + 1, y, x + 1, y + 1);
      if (!isFilled(x, y + 1)) addEdge(x + 1, y + 1, x, y + 1);
      if (!isFilled(x - 1, y)) addEdge(x, y + 1, x, y);
    }
  }

  const paths = [];
  const decodePoint = (key) => ({ x: key % stride, y: Math.floor(key / stride) });
  while (edges.size > 0) {
    const start = edges.keys().next().value;
    const points = [decodePoint(start)];
    let current = start;

    do {
      const options = edges.get(current);
      if (!options?.length) break;
      const next = options.pop();
      if (options.length === 0) edges.delete(current);
      current = next;
      points.push(decodePoint(current));
    } while (current !== start);

    if (current !== start || points.length < 4) continue;
    points.pop();
    const simplified = points.filter((point, index) => {
      const previous = points[(index - 1 + points.length) % points.length];
      const next = points[(index + 1) % points.length];
      return !((previous.x === point.x && point.x === next.x) || (previous.y === point.y && point.y === next.y));
    });
    paths.push(`M${simplified.map(({ x, y }) => `${x} ${y}`).join('L')}Z`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${info.width} ${info.height}" role="img" aria-label="Isotipo Richard Agapito"><path fill="${color}" fill-rule="evenodd" d="${paths.join('')}"/></svg>\n`;
}

const primary = await solidLogo({ color: navy, width: 1200 });
const primaryBlack = await solidLogo({ color: black, width: 1200 });
const primaryWhite = await solidLogo({ color: white, width: 1200 });
const symbolNavy = await solidLogo({
  crop: { left: 55, top: 4, width: 185, height: 268 },
  color: navy,
  width: 700,
});
const symbolWhite = await solidLogo({
  crop: { left: 55, top: 4, width: 185, height: 268 },
  color: white,
  width: 700,
});

await Promise.all([
  sharp(primary).toFile(join(output, 'logo-primary-transparent.png')),
  sharp(primaryBlack).toFile(join(output, 'logo-monochrome-black.png')),
  sharp(primaryWhite).toFile(join(output, 'logo-primary-white-transparent.png')),
  sharp(symbolNavy).toFile(join(output, 'logo-symbol-navy.png')),
  sharp(symbolWhite).toFile(join(output, 'logo-symbol-white.png')),
  placeOnBackground(primary, {
    width: 1400,
    height: 1580,
    background: white,
    padding: 130,
  }).then((image) => sharp(image).toFile(join(output, 'logo-primary-white-bg.png'))),
  placeOnBackground(primaryWhite, {
    width: 1400,
    height: 1580,
    background: navy,
    padding: 130,
  }).then((image) => sharp(image).toFile(join(output, 'logo-inverted-navy-bg.png'))),
  placeOnBackground(symbolWhite, {
    width: 1024,
    height: 1024,
    background: navy,
    padding: 190,
  }).then((image) => sharp(image).toFile(join(output, 'logo-symbol-square-inverted.png'))),
  horizontalLogo(navy, { r: 255, g: 255, b: 255, alpha: 0 }).then((image) =>
    sharp(image).toFile(join(output, 'logo-horizontal-transparent.png')),
  ),
  horizontalLogo(white, { r: 0, g: 0, b: 0, alpha: 0 }).then((image) =>
    sharp(image).toFile(join(output, 'logo-horizontal-white-transparent.png')),
  ),
  horizontalLogo(white, navy).then((image) =>
    sharp(image).toFile(join(output, 'logo-horizontal-inverted.png')),
  ),
  vectorizeAlpha(symbolWhite).then((svg) => writeFile(join(output, 'logo-symbol-white.svg'), svg, 'utf8')),
]);

const previewNames = [
  'logo-primary-white-bg.png',
  'logo-inverted-navy-bg.png',
  'logo-horizontal-transparent.png',
  'logo-horizontal-inverted.png',
  'logo-symbol-navy.png',
  'logo-symbol-square-inverted.png',
];

const previewTiles = await Promise.all(
  previewNames.map(async (name) => {
    const tile = await sharp(join(output, name))
      .resize({ width: 650, height: 500, fit: 'contain', background: '#f3f4f6' })
      .extend({ top: 24, bottom: 24, left: 24, right: 24, background: '#f3f4f6' })
      .png()
      .toBuffer();
    return { input: tile };
  }),
);

const tileWidth = 698;
const tileHeight = 548;
await sharp({ create: { width: tileWidth * 2, height: tileHeight * 3, channels: 4, background: '#e5e7eb' } })
  .composite(
    previewTiles.map((tile, index) => ({
      ...tile,
      left: (index % 2) * tileWidth,
      top: Math.floor(index / 2) * tileHeight,
    })),
  )
  .png()
  .toFile(join(output, 'logo-variants-preview.png'));

console.log(`Logo variants generated in ${output}`);
