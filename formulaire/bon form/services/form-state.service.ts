import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {

  private formState : {[ key: string]: any}= {};

  constructor() { }
  saveFormState(formName: string, formGroup: FormGroup) {
    this.formState[formName] = formGroup.value;
  }
  restoreFormState(formName:string, FormGroup: FormGroup) {
    const formValue = this.formState[formName];
    if(formValue) {
      FormGroup.setValue(formValue);
    }
  }
}
