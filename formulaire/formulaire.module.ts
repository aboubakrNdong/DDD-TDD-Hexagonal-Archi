import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UpteviaLibModule } from '../uptevia-lib.module';
import { FormulaireComponent } from './formulaire.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormulaireComponent],
  imports: [
    CommonModule, 
    UpteviaLibModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FormulaireComponent]
})
export class FormulaireModule { }
