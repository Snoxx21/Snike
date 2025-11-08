// A singleton class to manage all audio in the game.
class AudioManager {
  private audioContext: AudioContext | null = null;
  private musicNodes: {
    oscillator: OscillatorNode;
    gain: GainNode;
  } | null = null;
  private musicInterval: number | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;

  // This must be called from a user interaction event (e.g., a button click)
  // to comply with browser autoplay policies.
  public initialize(): void {
    if (this.audioContext) {
      return;
    }
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
    } catch (e) {
      console.error("Web Audio API is not supported in this browser");
    }
  }

  private resumeContext(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  public playFoodSound(): void {
    if (!this.audioContext || !this.masterGain) return;
    this.resumeContext();

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(880, now); // A5 note

    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.start(now);
    oscillator.stop(now + 0.2);
  }

  public playGameOverSound(): void {
    if (!this.audioContext || !this.masterGain) return;
    this.resumeContext();
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, now);
    oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.7);

    gainNode.gain.setValueAtTime(0.4, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.start(now);
    oscillator.stop(now + 0.7);
  }

  public startMusic(): void {
    if (!this.audioContext || !this.masterGain || this.musicNodes) return;
    this.resumeContext();

    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    oscillator.type = 'sine';
    gain.gain.value = 0.15; // Background music should be quiet
    
    oscillator.connect(gain);
    gain.connect(this.masterGain);
    
    oscillator.start();
    
    this.musicNodes = { oscillator, gain };

    const notes = [220.00, 261.63, 329.63, 261.63]; // A3, C4, E4, C4
    let noteIndex = 0;
    
    const playNote = () => {
      if (this.musicNodes && this.audioContext) {
        const now = this.audioContext.currentTime;
        this.musicNodes.oscillator.frequency.setValueAtTime(notes[noteIndex % notes.length], now);
        noteIndex++;
      }
    };
    
    playNote(); // Play first note immediately
    this.musicInterval = window.setInterval(playNote, 250);
  }

  public stopMusic(): void {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.musicNodes && this.audioContext) {
      const now = this.audioContext.currentTime;
      this.musicNodes.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      this.musicNodes.oscillator.stop(now + 0.5);
      this.musicNodes = null;
    }
  }

  public toggleMute(): boolean {
    if (!this.masterGain || !this.audioContext) return this.isMuted;
    
    this.isMuted = !this.isMuted;
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.audioContext.currentTime);
    return this.isMuted;
  }
}

// Export a singleton instance of the AudioManager
export const audioManager = new AudioManager();
