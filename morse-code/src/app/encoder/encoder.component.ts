import { Component } from '@angular/core';
import { MorsecodeService } from '../morsecode.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encoder',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './encoder.component.html',
  styleUrl: './encoder.component.css'
})
export class EncoderComponent {

  inputText: string = '';
  inputMorse: string = '';
  outputText: string = '';

  constructor(public morseService : MorsecodeService) { }

  convertTextToMorse() {
      this.morseService.convertToMorseCode(this.inputText);
  }
}
