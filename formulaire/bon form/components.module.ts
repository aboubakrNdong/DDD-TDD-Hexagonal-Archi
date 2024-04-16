import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { PortefeuilleModule } from './portefeuille-tab/porefeuille.module';
import { RubriqueModule } from './rubrique-aide/rubrique.module';
import { UpteviaLibModule } from './uptevia-lib.module';
import { ContactSupportModule } from './contact-support/contact-support.module';
import { ContactformModule } from './contactform/contactform.module';

import { SideBarModule } from './side-menu/side-menu.module';
import { RegisterformModule } from './registerform/registerform.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UpteviaLibModule,
    SideBarModule,
    PortefeuilleModule,
    HeaderModule,
    FooterModule,
    RubriqueModule,
    ContactSupportModule,
    ContactformModule,
    RegisterformModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    UpteviaLibModule,
    SideBarModule,
    PortefeuilleModule,
    HeaderModule,
    FooterModule,
    RubriqueModule,
    ContactSupportModule,
    ContactformModule,
    RegisterformModule,
  ],
})
export class ComponentsModule { }
