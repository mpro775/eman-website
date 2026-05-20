declare module 'snd-lib' {
  export interface PlayOptions {
    volume?: number;
    loop?: boolean;
    playbackRate?: number;
    delay?: number;
    index?: number;
    [key: string]: any;
  }

  export default class Snd {
    constructor(options?: {
      easySetup?: boolean;
      muteOnWindowBlur?: boolean;
      preloadSoundKit?: any;
    });

    static masterVolume: number;
    static KITS: {
      SND01: string;
      [key: string]: string;
    };
    static SOUNDS: {
      TAP: string;
      SWIPE: string;
      NOTIFICATION: string;
      CAUTION: string;
      TYPE: string;
      TOGGLE_ON: string;
      TOGGLE_OFF: string;
      PROGRESS_LOOP: string;
      [key: string]: string;
    };

    isMuted: boolean;
    mute(): void;
    unmute(): void;
    load(kit: string): Promise<void>;
    play(soundKey: string, options?: PlayOptions): void;
    stop(soundKey: string): void;
  }
}

declare module 'snd-lib/dist/snd' {
  import { PlayOptions } from 'snd-lib';
  export type { PlayOptions };
}
