import { create } from 'zustand';

type SoundSettings = {
  enabled: boolean;
  volume: number; // 0..1 (mapped to Snd.masterVolume)
};

type SoundState = SoundSettings & {
  setEnabled: (enabled: boolean) => void;
  toggleEnabled: () => void;
  setVolume: (volume: number) => void;
};

const STORAGE_KEY = 'eman.sound.settings.v1';

const defaults: SoundSettings = {
  enabled: true,
  volume: 0.3,
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function loadInitialSettings(): SoundSettings {
  if (typeof window === 'undefined') return defaults;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const parsed = JSON.parse(raw) as Partial<SoundSettings>;

    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : defaults.enabled,
      volume: typeof parsed.volume === 'number' ? clamp01(parsed.volume) : defaults.volume,
    };
  } catch {
    return defaults;
  }
}

function persistSettings(next: SoundSettings) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export const useSoundStore = create<SoundState>((set, get) => ({
  ...loadInitialSettings(),

  setEnabled: (enabled) => {
    set({ enabled });
    const { volume } = get();
    persistSettings({ enabled, volume });
  },

  toggleEnabled: () => {
    const enabled = !get().enabled;
    set({ enabled });
    const { volume } = get();
    persistSettings({ enabled, volume });
  },

  setVolume: (volume) => {
    const v = clamp01(volume);
    set({ volume: v });
    const { enabled } = get();
    persistSettings({ enabled, volume: v });
  },
}));

