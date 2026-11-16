// ai-excited-01 entry: "The Whale in the Teacup" (Node 22, standard library only).
//
// The artwork ships beside this file as entry.png; the program's whole job is
// to place those exact bytes at /output/entry.png. Copying a stored image
// keeps the two grader runs byte-identical: no drawing, no randomness, no
// clock, no network — the output is the file, every time.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputPath = join(outputDir, 'entry.png');

// The grader provides /output, but create it when missing so a local run in a
// fresh directory works the same way.
mkdirSync(outputDir, { recursive: true });

copyFileSync(new URL('./entry.png', import.meta.url), outputPath);

// Verify what was written before calling it done: the gate only judges a
// whole PNG or JPEG of at most 1 MiB, so fail loudly here — where the fix is
// cheap — instead of letting a corrupt or oversized copy reach the judge.
const GATE_MAX_BYTES = 1_048_576;
const written = readFileSync(outputPath);
const isPng = written.length >= 4 && written[0] === 0x89 && written[1] === 0x50 && written[2] === 0x4e && written[3] === 0x47;
const isJpeg = written.length >= 3 && written[0] === 0xff && written[1] === 0xd8 && written[2] === 0xff;
if (!isPng && !isJpeg) {
  throw new Error('entry.png was written but has no PNG or JPEG signature');
}
if (written.length > GATE_MAX_BYTES) {
  throw new Error(`entry.png is ${written.length} bytes, over the 1 MiB gate limit`);
}
