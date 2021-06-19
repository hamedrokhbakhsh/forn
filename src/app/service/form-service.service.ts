import {Injectable} from '@angular/core';
import {FormControlModel, InputType, ResponseModel, Role, Validator} from "../models";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  data: Map<number, any> = new Map<number, any>();
  form: FormControlModel[] = [];

  constructor() {
  }

  getFormControls(): Observable<FormControlModel[]> {
    return of([
      {
        name: 'fullName',
        label: 'Name',
        type: InputType.Text,
        validator: [Validator.Required],
        editRole: [Role.admin,Role.user],
        viewRole: [Role.user],
        viewable: true,
        editable: true
      }, {
        name: 'mobile',
        label: 'Mobile',
        type: InputType.Text,
        validator: [Validator.Required, Validator.Pattern],
        editRole: [Role.admin,Role.user],
        viewRole: [Role.user],
        viewable: true,
        editable: true,
        pattern: '^((\\+91-?)|0)?[0-9]{10}$'
      }, {
        name: 'email',
        label: 'Email',
        type: InputType.Text,
        validator: [Validator.Required, Validator.Email],
        editRole: [Role.admin,Role.user],
        viewRole: [Role.user],
        viewable: true,
        editable: true
      }, {
        name: 'gender',
        label: 'Gender',
        type: InputType.OneSelect,
        editRole: [Role.admin,Role.user],
        viewRole: [Role.user],
        viewable: true,
        editable: true,
        options: [
          {key: '', title: 'Select ...'},
          {key: 'male', title: 'Male'},
          {key: 'female', title: 'Female'}
        ]
      }, {
        name: 'birthDate',
        label: 'Birth Date',
        type: InputType.Date,
        editRole: [Role.admin,Role.user],
        viewRole: [Role.user],
        viewable: true,
        editable: true
      }, {
        name: 'accountRange',
        label: 'Account Range',
        type: InputType.DateRange,
        editRole: [Role.admin],
        viewRole: [Role.user],
        viewable: true,
        editable: true
      }, {
        name: 'info',
        label: 'Info',
        type: InputType.Editor,
        editRole: [Role.admin],
        viewRole: [Role.user],
        viewable: false,
        editable: true
      }
    ]);
  }

  list(params: any): Observable<ResponseModel> {
    return of({
      status: true,
      body: Array.from(this.data.values())
    });
  }

  get(id: number): Observable<ResponseModel> {
    if (!this.data.has(id)) {
      return of({
        status: false,
        message: 'Not found model.'
      });
    }
    return of({
      status: true,
      body: this.data.get(id)
    });
  }

  save(model: any): Observable<ResponseModel> {
    if (!model.id) {
      model.id = this.generateId();
    }
    this.data.set(model.id, model);
    return of({
      status: true,
      body: model,
      message: 'Successfully saved model.'
    });
  }

  delete(id: number): Observable<ResponseModel> {
    if (!this.data.has(id)) {
      return of({
        status: false,
        message: 'Not found model.'
      });
    }
    this.data.delete(id);
    return of({
      status: true,
      message: 'Successfully deleted model.'
    });
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
