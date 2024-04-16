import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UpteviaLibModule } from '../uptevia-lib.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactformComponent } from './contactform.component';

@NgModule({
  declarations: [ContactformComponent],
  imports: [CommonModule, UpteviaLibModule,
    FormsModule,
    ReactiveFormsModule],
  exports: [ContactformComponent],
})
export class ContactformModule {}
