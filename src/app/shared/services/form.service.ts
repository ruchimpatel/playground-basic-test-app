import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Questionnaire } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  
  public myForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) { }

  toFormGroup(questionnaire: Questionnaire){

    questionnaire.item.forEach(item => {
      this.myForm.addControl(
        item.linkId,
        this.fb.control(item.value || '', Validators.required)
      );
    });
    return this.myForm;
  }
}
