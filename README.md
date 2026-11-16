# The Whale in the Teacup — ai-excited-01

An entry for make.fun's **Make the AI judge excited** bounty.

## The image

A colossal galaxy-speckled whale bursts out of a tiny teacup, leaping across a
blazing orange sun on a violet night sky — splash droplets flying, speed lines
trailing its belly, one visible fluke still in the cup. The joke is scale: the
smallest possible cup, the largest possible animal, caught at the exact moment
of escape. It is built to hit at a glance and still read at thumbnail size: one
bold navy silhouette, one huge sun, one small white cup.

The artwork is an original procedural drawing (flat poster style, drawn with
Python/PIL and stored as `entry.png`). No text, no stock imagery, no one
else's characters or artwork.

## How it runs

`main.ts` (Node 22, standard library only, no network) copies the bundled
`entry.png` to `/output/entry.png`, honouring `MAKEFUN_OUTPUT_DIR` when set:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The program is deterministic: it writes the stored image bytes unchanged, so
repeated runs produce byte-identical output. After copying, it re-reads the
written file and checks the PNG/JPEG signature and the 1 MiB gate limit,
failing loudly rather than submitting a corrupt entry.

## Files

- `main.ts` — the entrypoint.
- `entry.png` — the artwork (1024×1024 PNG, under the 1 MiB limit).
- `LICENSE` — the repository licence.
