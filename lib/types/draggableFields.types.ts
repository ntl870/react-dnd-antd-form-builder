import type { FormBuilderFieldType } from '../constants/formBuilder';

export interface DraggableFieldCommonState {
  isEdit?: boolean;
  id?: string;
  required?: boolean;
  placeholder?: string;
  title?: string;
}

export interface FormPreviewerFieldCommonProps {
  label?: string;
  name?: string;
  required?: boolean;
}

export interface InputFieldEditState extends DraggableFieldCommonState {}

export interface TextFieldEditState extends DraggableFieldCommonState {
  content?: string;
  description?: string;
}

export interface OptionType {
  value: string;
  name: string;
}

export interface SelectFieldEditState extends DraggableFieldCommonState {
  options?: OptionType[];
}

export interface CheckBoxType {
  value: string;
  label: string;
}

export interface CheckboxFieldEditState extends DraggableFieldCommonState {
  checkBoxOptions?: CheckBoxType[];
}

export interface RadioType {
  value: string;
  label: string;
}

export interface RadioFieldEditState extends DraggableFieldCommonState {
  radioOptions?: RadioType[];
}

export interface DatePickerFieldEditState extends DraggableFieldCommonState {
  date?: string;
}

export interface FileUploadFieldEditState extends DraggableFieldCommonState {}

export interface SignatureFieldEditState extends DraggableFieldCommonState {
  signature?: string;
}

export interface ImageFieldEditState extends DraggableFieldCommonState {
  pathFile?: string;
}

export interface DividerFieldEditState extends DraggableFieldCommonState {}

export type DraggableFieldStateType = InputFieldEditState &
  TextFieldEditState &
  SelectFieldEditState &
  CheckboxFieldEditState &
  RadioFieldEditState &
  DatePickerFieldEditState &
  FileUploadFieldEditState &
  SignatureFieldEditState &
  ImageFieldEditState &
  DividerFieldEditState;

export interface DraggableField {
  id: string;
  name: string;
  type: FormBuilderFieldType;
  title?: string;
  state: DraggableFieldStateType;
  value?: string | string[];
}

export interface SidebarComponent {
  type: FormBuilderFieldType;
}
