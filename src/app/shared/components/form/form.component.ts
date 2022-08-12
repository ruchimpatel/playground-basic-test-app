import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Type } from '../../enum';
import { Item } from '../../interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() item!: Item;
  @Input() form!: FormGroup;
  today = new Date();
  type = Type;

  constructor() { }

  ngOnInit(): void {
  }

  get isValid() { return this.form.controls[this.item.linkId].valid; }
  
}
