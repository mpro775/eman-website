import swipeSrc from '../assets/sounds/swipe.wav';
import { useSoundStore } from '../store/sound.store';

let audioCtx: AudioContext | null = null;
let buffer: AudioBuffer | null = null;
let loadPromise: Promise<void> | null = null;
let lastPlayedAt = 0;

const THROTTLE_MS = 300;

function getAudioCtx(): AudioContext {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    return audioCtx;
}

async function loadBuffer(): Promise<void> {
    if (buffer) return;

    const ctx = getAudioCtx();
    const response = await fetch(swipeSrc);
    const arrayBuf = await response.arrayBuffer();
    buffer = await ctx.decodeAudioData(arrayBuf);
}

function ensureLoaded(): Promise<void> {
    if (!loadPromise) {
        loadPromise = loadBuffer().catch(() => {
            loadPromise = null;
        });
    }
    return loadPromise;
}

export function playCustomSwipe(volume = 0.5): void {
    const { enabled, volume: masterVolume } = useSoundStore.getState();
    if (!enabled) return;

    const now = performance.now();
    if (now - lastPlayedAt < THROTTLE_MS) return;
    lastPlayedAt = now;

    void ensureLoaded().then(() => {
        if (!buffer) return;

        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') {
            void ctx.resume();
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const gain = ctx.createGain();
        gain.gain.value = volume * masterVolume;

        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(0);
    });
}
