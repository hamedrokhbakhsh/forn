import {Component, OnInit} from '@angular/core';
import {FormControlModel, InputType, Validator} from "../models";
import {FormServiceService} from "../service/form-service.service";
import {MessageService} from "primeng/api";
import {AuthServiceService} from "../service/auth-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  data: any[] = [];
  filterMap: any = [];
  formMetaData: FormControlModel[] = [];
  form: FormGroup | undefined;

  constructor(private formService: FormServiceService, private messageService: MessageService,
              private authService: AuthServiceService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    if (id != null) {
      this.formService.get(+id).subscribe(res => {
        if (res.status) {
          this.fetchFormInfo(res.body);
        } else {
          this.messageService.add({key: 'error', severity: 'error', summary: 'Error!', detail: 'not found model.'});
        }
      }, error => {
        this.fetchFormInfo(null);
        this.messageService.add({key: 'error', severity: 'error', summary: 'Error!', detail: error.message});
      })
    } else {
      this.fetchFormInfo(null)
    }
  }

  async fetchFormInfo(data: any) {
    if (!data) {
      data = {};
    }
    try {
      let forms = await this.formService.getFormControls().toPromise();
      if (forms) {
        let formControls: any = {};
        this.formMetaData = forms.filter(control => control.editable && this.authService.hasAnyRole(control.editRole));
        this.formMetaData.forEach(control => {
          if (control.type == InputType.DateRange || control.type == InputType.NumberRange) {
            formControls[control.name + '_from'] = [data[control.name + '_from'], this.getValidator(control)];
            formControls[control.name + '_to'] = [data[control.name + '_to'], this.getValidator(control)];
          } else {
            formControls[control.name] = [data[control.name], this.getValidator(control)];
          }
        });
        this.form = this.fb.group(formControls);
      } else {
        this.messageService.add({key: 'error', severity: 'error', summary: 'Error!', detail: 'unable form metadata'});
      }
    } catch (e) {
      this.messageService.add({key: 'error', severity: 'error', summary: 'Error!', detail: e.message});
    }
  }

  submit() {
    if (this.form?.valid) {
      this.formService.save(this.form?.value).subscribe(res => {
        if (res.status) {
          this.router.navigate([''])
        }
        this.messageService.add({
          key: 'error',
          severity: res.status ? 'info' : 'error',
          summary: 'Error!',
          detail: res.message
        })
      }, error => {
        this.messageService.add({key: 'error', severity: 'error', summary: 'Error!', detail: error.message});
      })
    }
  }

  getValidator(control: FormControlModel) {
    if (!control.validator || control.validator.length == 0) {
      return [];
    }
    let vlist = control.validator.map(v => {
      switch (v) {
        case Validator.Email:
          return Validators.email;
        case Validator.Max:
          if (control.max != undefined) {
            return Validators.min(control.max);
          }
          return null;
        case Validator.Min:
          if (control.min != undefined) {
            return Validators.min(control.min);
          }
          return null;
        case Validator.Pattern:
          if (control.pattern) {
            return Validators.pattern(control?.pattern);
          }
          return null;
        case Validator.Required:
          return Validators.required;
      }
      return null;
    }).filter(x => x != null);
    return vlist;
  }
}
