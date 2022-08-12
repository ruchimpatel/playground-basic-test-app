import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemResponse, Questionnaire, QuestionnaireResponse } from 'src/app/shared/interface';
import { FormService } from 'src/app/shared/services/form.service';
import { Type } from 'src/app/shared/enum';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

  public formData: Questionnaire = {} as Questionnaire;
  public questionnaireResponse = {} as QuestionnaireResponse;
  public patientForm: FormGroup = this.fb.group({});
  public dataSubmitted = false;

  constructor(private http : HttpClient, private formService: FormService, private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.http
    .get('/assets/questionnaire.json')
    .subscribe((data) => {
      this.formData = data as Questionnaire;
      console.log(this.formData);
      this.patientForm = this.formService.toFormGroup(this.formData);
    });
  }

  onSubmit(){
    console.log(JSON.stringify(this.patientForm.value));
    
    this.questionnaireResponse.resourceType = this.formData.resourceType;
    this.questionnaireResponse.id = this.formData.id;
    this.questionnaireResponse.identifier = [{ system : "smilecdr/playground-basic-test-app" , value:  Math.random().toString()}]; 
    this.questionnaireResponse.basedOn = [{ reference : "CarePlan"}];
    this.questionnaireResponse.partOf = [{reference : "Observation"}];
    this.questionnaireResponse.questionnaire = {subjectType : this.formData.subjectType[0]};
    this.questionnaireResponse.status = "completed";
    this.questionnaireResponse.subject = {reference : "Patient"};
    this.questionnaireResponse.encounter = {reference: "example/encounter"};
    this.questionnaireResponse.authored = new Date();
    this.questionnaireResponse.author = { reference : "Device"};
    this.questionnaireResponse.source = { answeredBy : "Patient"};
    this.questionnaireResponse.item = [] as ItemResponse[];
    this.formData.item.forEach(item => {
      let itemRes = {} as ItemResponse;
      itemRes.linkId = item.linkId;
      itemRes.text = item.text;
      if(item.type === Type.select || item.type === Type.text){
        itemRes.answer = [{ valueString : this.patientForm.get(item.linkId)?.value}];
      } else if (item.type === Type.radio){
        itemRes.answer = [{ valueBoolean : this.patientForm.get(item.linkId)?.value}];  
      } else if(item.type === Type.date){
        itemRes.answer = [{ valueDate : this.datePipe.transform(this.patientForm.get(item.linkId)?.value , "yyyy-MM-dd")?.toString()}];
      } else {
        itemRes.answer = [{}];
      }
      this.questionnaireResponse.item.push(itemRes);
    });
    this.dataSubmitted = true;
  }

}
