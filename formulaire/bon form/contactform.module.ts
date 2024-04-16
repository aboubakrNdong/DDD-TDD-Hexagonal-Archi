import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContactformComponent } from './contactform.component';
import { UpteviaLibModule } from '../uptevia-lib.module';
import { RegisterformModule } from '../registerform/registerform.module';

@NgModule({
  declarations: [ContactformComponent],
  imports: [CommonModule, UpteviaLibModule, RegisterformModule],
  exports: [ContactformComponent],
})
export class ContactformModule {}
