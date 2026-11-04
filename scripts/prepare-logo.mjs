import sharp from "sharp";

const [source, target] = process.argv.slice(2);

if (!source || !target) {
  throw new Error("Uso: node scripts/prepare-logo.mjs <origen> <destino>");
}

const { data, info } = await sharp(source)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixelCount = width * height;
const visited = new Uint8Array(pixelCount);
const queue = new Uint32Array(pixelCount);
let head = 0;
let tail = 0;

const isCheckerboard = (index) => {
  const offset = index * channels;
  const red = data[offset];
  const green = data[offset + 1];
  const blue = data[offset + 2];
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  return maximum - minimum <= 10 && minimum >= 188;
};

const enqueue = (index) => {
  if (visited[index] || !isCheckerboard(index)) return;
  visited[index] = 1;
  queue[tail++] = index;
};

for (let x = 0; x < width; x += 1) {
  enqueue(x);
  enqueue((height - 1) * width + x);
}

for (let y = 0; y < height; y += 1) {
  enqueue(y * width);
  enqueue(y * width + width - 1);
}

while (head < tail) {
  const index = queue[head++];
  const x = index % width;
  const y = Math.floor(index / width);
  if (x > 0) enqueue(index - 1);
  if (x + 1 < width) enqueue(index + 1);
  if (y > 0) enqueue(index - width);
  if (y + 1 < height) enqueue(index + width);
}

const rgba = Buffer.alloc(pixelCount * 4);
for (let index = 0; index < pixelCount; index += 1) {
  const inputOffset = index * channels;
  const outputOffset = index * 4;
  rgba[outputOffset] = data[inputOffset];
  rgba[outputOffset + 1] = data[inputOffset + 1];
  rgba[outputOffset + 2] = data[inputOffset + 2];
  rgba[outputOffset + 3] = visited[index] ? 0 : 255;
}

const result = await sharp(rgba, { raw: { width, height, channels: 4 } })
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(target);

console.log(JSON.stringify(result, null, 2));
