import { removeBackground } from '@imgly/background-removal-node';
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const input = join(root, process.argv[2] ?? 'src/assets/ukonnect-team.png');
const output = join(root, process.argv[3] ?? 'src/assets/ukonnect-team-cutout.webp');

console.log('Removing background from:', input);

const blob = await removeBackground(pathToFileURL(input).href, {
    debug: true,
    model: 'medium',
    output: {
        format: 'image/webp',
        quality: 0.94,
        type: 'foreground',
    },
});

const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync(output, buffer);
console.log('Saved:', output, `(${(buffer.length / 1024).toFixed(1)} KB)`);
