import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ListComponent} from './list/list.component';
import {FormComponent} from './form/form.component';
import {RouterModule} from "@angular/router";
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from "primeng/toolbar";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {EditorModule} from "primeng/editor";
import {CalendarModule} from "primeng/calendar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputMaskModule} from "primeng/inputmask";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import { ValidatorMessageComponent } from './components/validator-message/validator-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    ValidatorMessageComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    EditorModule,
    CalendarModule,
    BrowserAnimationsModule,
    InputMaskModule,
    InputNumberModule,
    DropdownModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ListComponent
      }, {
        path: 'form',
        component: FormComponent
      }, {
        path: 'form/:id',
        component: FormComponent
      }
    ]),
    InputTextareaModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
