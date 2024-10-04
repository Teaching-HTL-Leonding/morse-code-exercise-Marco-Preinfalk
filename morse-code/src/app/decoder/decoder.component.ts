import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MorsecodeService } from '../morsecode.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-decoder',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './decoder.component.html',
  styleUrl: './decoder.component.css',
})
export class DecoderComponent {
  inputText: string = '';
  inputMorse: string = '';
  outputText: string = '';

  constructor(public morseService: MorsecodeService) {
    this.morseService.reset()
    this.morseService.isDisabled.set(false);
  }

  convertMorseToText() {
    this.morseService.convertToText(this.inputText);
  }
}
