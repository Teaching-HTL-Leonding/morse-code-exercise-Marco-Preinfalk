import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MorsecodeService } from '../morsecode.service';

@Component({
  selector: 'app-decoder',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './decoder.component.html',
  styleUrl: './decoder.component.css'
})
export class DecoderComponent {

  inputText: string = '';
  inputMorse: string = '';
  outputText: string = '';

  constructor(public morseService : MorsecodeService) { }

  convertMorseToText() {
    this.morseService.convertToText(this.inputText);
  }

}
