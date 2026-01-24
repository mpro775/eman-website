import Snd from 'snd-lib';
import type { PlayOptions } from 'snd-lib/dist/snd';
import { useSoundStore } from '../store/sound.store';

let sndInstance: Snd | null = null;
let loadPromise: Promise<unknown> | null = null;
let unsubscribeFromStore: (() => void) | null = null;

function getSnd(): Snd {
  if (!sndInstance) {
    sndInstance = new Snd({
      easySetup: false,
      muteOnWindowBlur: true,
      preloadSoundKit: null,
    });
  }
  return sndInstance;
}

function isAdminPath(pathname: string) {
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

function isPublicRuntimeContext() {
  if (typeof window === 'undefined') return true;
  return !isAdminPath(window.location.pathname);
}

function applySettings(snd: Snd) {
  const { enabled, volume } = useSoundStore.getState();
  Snd.masterVolume = volume;

  if (enabled) {
    if (snd.isMuted) snd.unmute();
  } else {
    if (!snd.isMuted) snd.mute();
  }
}

function ensureStoreSubscription(snd: Snd) {
  if (unsubscribeFromStore) return;
  unsubscribeFromStore = useSoundStore.subscribe(() => {
    applySettings(snd);
  });
}

export async function initSoundKit() {
  // Only for public UI
  if (!isPublicRuntimeContext()) return;

  const snd = getSnd();
  ensureStoreSubscription(snd);
  applySettings(snd);

  if (!loadPromise) {
    loadPromise = snd.load(Snd.KITS.SND01).catch((err) => {
      // allow retry if load fails
      loadPromise = null;
      throw err;
    });
  }

  await loadPromise;
}

export function play(soundKey: string, options?: PlayOptions) {
  if (!isPublicRuntimeContext()) return;

  const snd = getSnd();
  ensureStoreSubscription(snd);
  applySettings(snd);

  if (snd.isMuted) return;

  const doPlay = () => {
    try {
      snd.play(soundKey, options);
    } catch {
      // ignore
    }
  };

  if (loadPromise) {
    void loadPromise.then(doPlay);
    return;
  }

  void initSoundKit().then(doPlay);
}

export function stop(soundKey: string) {
  const snd = sndInstance;
  if (!snd) return;

  try {
    snd.stop(soundKey);
  } catch {
    // ignore
  }
}

export function playTap(options?: PlayOptions) {
  play(Snd.SOUNDS.TAP, options);
}

export function playSwipe(options?: PlayOptions) {
  play(Snd.SOUNDS.SWIPE, options);
}

export function playNotification(options?: PlayOptions) {
  play(Snd.SOUNDS.NOTIFICATION, options);
}

export function playCaution(options?: PlayOptions) {
  play(Snd.SOUNDS.CAUTION, options);
}

export function playType(options?: PlayOptions) {
  play(Snd.SOUNDS.TYPE, options);
}

export function playToggleOn(options?: PlayOptions) {
  play(Snd.SOUNDS.TOGGLE_ON, options);
}

export function playToggleOff(options?: PlayOptions) {
  play(Snd.SOUNDS.TOGGLE_OFF, options);
}

export function startProgressLoop(options?: Omit<PlayOptions, 'loop'>) {
  play(Snd.SOUNDS.PROGRESS_LOOP, { ...options, loop: true });
}

export function stopProgressLoop() {
  stop(Snd.SOUNDS.PROGRESS_LOOP);
}

