import {Component, OnInit} from '@angular/core';
import {FormServiceService} from "../service/form-service.service";
import {MessageService} from "primeng/api";
import {AuthServiceService} from "../service/auth-service.service";
import {FormControlModel} from "../models";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data: any[] = [];
  filterMap: any = [];
  formMetaData: FormControlModel[] = [];
  columns: any[] = [];
  selections: any[] = [];

  constructor(private formService: FormServiceService, private messageService: MessageService, private authService: AuthServiceService) {
  }

  ngOnInit(): void {
    this.fetchTableInfo();
    this.fetchData();
  }

  async fetchTableInfo() {
    try {
      let forms = await this.formService.getFormControls().toPromise();
      if (forms) {
        this.formMetaData = forms;
        this.columns = this.formMetaData.filter(control => control.viewable && this.authService.hasAnyRole(control.viewRole))
          .map(control => {
            return {field: control.name, header: control.label, type: control.type, options: control.options}
          });
      } else {
        this.messageService.add({key: 'error', severity: 'error', summary: 'Error!', detail: 'unable form metadata'});
      }
    } catch (e) {
      this.messageService.add({key: 'error', severity: 'error', summary: 'Error!', detail: e.message});
    }
  }

  fetchData() {
    this.formService.list(this.filterMap).subscribe(res => {
      if (res.status) {
        this.data = res.body;
      } else {
        this.messageService.add({key: 'error', severity: 'error', summary: 'Error!', detail: res.message})
      }
    }, error => {
      this.messageService.add({key: 'error', severity: 'error', summary: 'Error!', detail: error.message})
    })
  }

  deleteModel(model: any) {
    this.formService.delete(model.id).subscribe(res => {
      if (res.status) {
        this.fetchData();
      }
      this.messageService.add({
        key: 'error',
        severity: res.status ? 'info' : 'error',
        summary: 'Error!',
        detail: res.message
      })
    }, error => {
      this.messageService.add({key: 'error', severity: 'error', summary: 'Error!', detail: error.message})
    })
  }
}
