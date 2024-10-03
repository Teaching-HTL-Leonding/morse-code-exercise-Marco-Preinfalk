import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MorsecodeService {

    text = signal<string>('');
    morseCode = signal<string>('');

    private charToMorse: { [key: string]: string } = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
      'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
      'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..', ' ': '/'
    };

    constructor() {}

    convertToMorseCode(text: string): void {

      const morse = text.toUpperCase().split('').map((c) => this.charToMorse[c] || c).join(' ');
      this.morseCode.set(morse);
      this.text.set(text);
    }

    convertToText(morseCode: string): void {
      const text = morseCode.split(' ').map((c) => Object.keys(this.charToMorse).find(key => this.charToMorse[key] === c) || c).join('');
      this.text.set(text);
      this.morseCode.set(morseCode);
    }
  }
