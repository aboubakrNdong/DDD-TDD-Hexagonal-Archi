import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UpteviaLibModule } from '../uptevia-lib.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonneespersoComponent } from './donneesperso.component';

@NgModule({
  declarations: [DonneespersoComponent],
  imports: [CommonModule, UpteviaLibModule,
    FormsModule,
    ReactiveFormsModule],
  exports: [DonneespersoComponent],
})
export class DonneesPersoModule {}
