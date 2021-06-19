export enum InputType {
  Text, Number, Date, DateRange, NumberRange, TextArea, Editor, Mask, OneSelect
}

export enum Role {
  user, admin, another
}

export interface Option {
  key: string;
  title: any
}

export enum Validator {
  Required, Max, Min, Pattern, Email
}

export interface FormControlModel {
  name: string;
  label: string;
  description?: string;
  type: InputType;
  validator?: Validator[];
  viewable: boolean;
  editable: boolean;
  editRole: Role[];
  viewRole: Role[];
  pattern?: string | undefined;
  options?: Option[] | undefined;
  min?: number;
  max?: number;
}

export interface UserInfo {
  name?: string;
  roles?: Role[];
}

export interface ResponseModel {
  status: boolean;
  message?: string;
  body?: any;
}

