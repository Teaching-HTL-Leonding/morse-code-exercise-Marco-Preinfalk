import { Routes } from '@angular/router';
import { DecoderComponent } from './decoder/decoder.component';
import { EncoderComponent } from './encoder/encoder.component';

export const routes: Routes = [
  {path : 'decode', component: DecoderComponent},
  {path : 'encode', component : EncoderComponent},
  {path : '', redirectTo: '', pathMatch: 'full'}
];
