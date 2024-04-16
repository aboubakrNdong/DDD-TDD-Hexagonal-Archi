import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UpteviaLibModule } from '../uptevia-lib.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterformComponent } from './registerform.component';

@NgModule({
  declarations: [RegisterformComponent],
  imports: [CommonModule, UpteviaLibModule,
    FormsModule,
    ReactiveFormsModule],
  exports: [RegisterformComponent],
})
export class RegisterformModule {}
