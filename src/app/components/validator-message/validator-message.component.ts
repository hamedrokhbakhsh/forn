import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-validator-message',
  templateUrl: './validator-message.component.html',
  styleUrls: ['./validator-message.component.css']
})
export class ValidatorMessageComponent implements OnInit {
  @Input()
  id: string='help';
  @Input()
  control?: AbstractControl | null;
  @Input()
  min?: number;
  @Input()
  max?: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
