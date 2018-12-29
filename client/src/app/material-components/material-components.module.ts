import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //angular material components
    MatButtonModule,
  ],
  exports: [
    MatButtonModule,
  ],
})
export class MaterialComponentsModule { }
