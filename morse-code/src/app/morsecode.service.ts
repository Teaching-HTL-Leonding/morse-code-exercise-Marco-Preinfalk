import { Injectable, signal } from '@angular/core';
import {
  initializeAudioContext,
  playDash,
  playDot,
  sleep,
  SYMBOL_BREAK,
  WORD_BREAK,
} from './player';

@Injectable({
  providedIn: 'root',
})
export class MorsecodeService {
  readonly text = signal<string>('');
  readonly morseCode = signal<string>('');
  readonly errorMessage = signal<string>('');
  isDisabled = signal<boolean>(false);

  private charToMorse: { [key: string]: string } = {
    A: '.-',
    B: '-...',
    C: '-.-.',
    D: '-..',
    E: '.',
    F: '..-.',
    G: '--.',
    H: '....',
    I: '..',
    J: '.---',
    K: '-.-',
    L: '.-..',
    M: '--',
    N: '-.',
    O: '---',
    P: '.--.',
    Q: '--.-',
    R: '.-.',
    S: '...',
    T: '-',
    U: '..-',
    V: '...-',
    W: '.--',
    X: '-..-',
    Y: '-.--',
    Z: '--..',
    ' ': '/',
  };

  constructor() {}

  convertToMorseCode(text: string): void {
    if (!/^[a-zA-Z\s]*$/.test(text)) {
      this.isDisabled.set(true);
      return;
    }

    text = text.replace(/\s+/g, ' ');

    const morse = text
      .toUpperCase()
      .split('')
      .map((c) => this.charToMorse[c] || c)
      .join(' ');

    this.morseCode.set(morse);
    this.text.set(text);

    this.errorMessage.set('');
  }

  convertToText(morseCode: string): void {
    if (!/^[\s\.\-\/]*$/.test(morseCode)) {
      this.isDisabled.set(true);
      return;
    }

    const text = morseCode
      .split(' ')
      .map((c) => {
        const char = Object.keys(this.charToMorse).find(
          (key) => this.charToMorse[key] === c
        );
        if (!char) {
          this.errorMessage.set(`Ungültige Morsecode-Kombination: "${c}"`);
          return '';
        }
        return char;
      })
      .join('');

    if (this.errorMessage() === '') {
      this.text.set(text);
      this.morseCode.set(morseCode);
    }
  }

  reset(): void {
    this.text.set('');
    this.morseCode.set('');
    this.errorMessage.set('');
  }

  async playMorseCode(): Promise<void> {
    initializeAudioContext();
    for (const c of this.morseCode().split('')) {
      switch (c) {
        case '.':
          await playDot();
          await sleep(SYMBOL_BREAK);
          break;
        case '-':
          await playDash();
          await sleep(SYMBOL_BREAK);
          break;
        case '/':
          await sleep(WORD_BREAK);
          break;
        case ' ':
          await sleep(SYMBOL_BREAK);
          break;
      }
    }
  }
}
