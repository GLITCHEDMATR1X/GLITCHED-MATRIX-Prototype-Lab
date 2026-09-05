# Codex Task — GenesisPy VDP Pass 02

## Goal
Advance our from-scratch Python Sega Mega Drive / Genesis emulator from CPU boot execution into real video output. Do not replace the emulator with an external emulator core or wrapper.

## Current verified state
- Real Motorola 68000 interpreter written in Python.
- 24-bit Genesis bus, cartridge mapping, 64 KB work RAM, Z80/IO/TMSS stubs.
- Initial VDP storage/register handling and level-6 VBlank interrupt support.
- The S3&K development ROM has executed 1,500,000 68000 instructions without hitting an unsupported opcode.
- 64 level-6 VBlank interrupts were accepted during the long headless run.
- Thousands of VDP control/data writes were observed.
- Current frontier is VDP/DMA/scanline timing; the game reaches normal hardware wait loops rather than crashing.

## Work requested
Implement the next VDP layer while preserving the existing architecture:

1. VDP control-port command decoding
   - Two-word command latch.
   - Register writes.
   - VRAM / CRAM / VSRAM address and access-mode selection.
   - Auto-increment behavior.

2. VDP data-port reads/writes
   - Correct target memory selection.
   - Correct address increment/wrap behavior.

3. DMA foundation
   - Parse DMA source, length, and mode registers.
   - Implement 68K-to-VDP memory DMA first.
   - Make DMA deterministic and testable.
   - Leave copy/fill DMA cleanly isolated if not completed in the same pass.

4. Scanline / frame timing model
   - NTSC-oriented initial timing is fine.
   - Track visible region, VBlank, frame counter, and line counter.
   - Raise level-6 VBlank IRQ from timing rather than an arbitrary instruction interval.
   - Add HBlank/H-counter scaffolding without faking unsupported behavior.

5. Minimal renderer
   - Produce a 320x224 or 256x224 software framebuffer from VDP state.
   - At minimum implement backdrop color and enough plane/tile decode to prove VRAM/CRAM are being interpreted.
   - Keep rendering independent of Panda3D. Panda3D should only display the resulting framebuffer.

6. Tests
   - Add focused unit tests for command decoding, auto-increment, CRAM format, VSRAM access, DMA length/source, and VBlank timing.
   - Existing headless/self tests must keep passing.
   - Add a deterministic hardware micro-test ROM fixture only if it is generated from code in the repo; do not commit proprietary ROM data.

## Constraints
- Python implementation remains our own emulator core.
- Panda3D is the frontend; do not switch engines.
- No libretro, RetroArch, Genesis Plus GX, PicoDrive, BlastEm, Musashi, MAME cores, or copied emulator implementations.
- Public hardware documentation may be consulted, but write original code.
- Do not commit Sonic/Sega ROMs, extracted assets, disassembly data, or copyrighted game binaries.
- Keep unsupported hardware explicit; never silently return "working" values merely to push the game farther.
- Preserve clean module boundaries. Prefer a dedicated `genesis/vdp.py` over growing `bus.py` indefinitely.
- Keep the workspace free of `__pycache__`, logs generated during runs, and ROM files.

## Acceptance criteria
- `python self_test.py` passes.
- New VDP unit tests pass.
- A 1,500,000-instruction local ROM regression test does not regress Pass 01.
- VBlank IRQ timing is driven by the VDP timing model.
- A framebuffer API exists and Panda3D can consume it without importing emulator internals.
- No proprietary ROM/data is added to Git.
- README/status notes clearly state what is implemented, approximate, or still missing.

## Bootstrap
The exact ROM-free Pass 01 source snapshot is in `bootstrap/source.part01.b64` and `bootstrap/source.part02.b64`. Run `python bootstrap/unpack_source.py` from `Prototype Lab/GenesisPy` once, then remove the bootstrap chunks in your final commit if desired.

## Stretch goal
Reach the first recognizable boot/title-screen pixels from a legally supplied local ROM. Do not hack around game wait loops to get there.
