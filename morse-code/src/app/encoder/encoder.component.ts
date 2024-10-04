import { Component } from '@angular/core';
import { MorsecodeService } from '../morsecode.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encoder',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './encoder.component.html',
  styleUrl: './encoder.component.css',
})
export class EncoderComponent {
  inputText: string = '';
  inputMorse: string = '';
  outputText: string = '';

  constructor(public morseService: MorsecodeService) {
    this.morseService.reset()
    this.morseService.isDisabled.set(false);
  }

  convertTextToMorse() {
    this.morseService.convertToMorseCode(this.inputText);
  }

  playMorseCode() {
    this.morseService.playMorseCode();
  }
}
