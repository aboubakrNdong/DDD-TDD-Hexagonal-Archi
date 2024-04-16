import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { BffService } from 'src/app/services/bff.service';

@Component({
  selector: 'profil-donneesperso',
  templateUrl: './donneesperso.component.html',
  styleUrls: ['./donneesperso.component.css']
})
export class DonneespersoComponent implements OnInit{

  @Input () formGroupName!: string;

  form!: FormGroup;


  civilite = ['Mr','Mme'];


  constructor(private rootFormGroup:FormGroupDirective ){
  }

  ngOnInit(): void {
   this.form =  this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

}

