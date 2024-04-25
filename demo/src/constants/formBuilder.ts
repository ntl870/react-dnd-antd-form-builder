import type { SidebarComponent } from "../types/draggableFields.types";

export enum FormBuilderFieldType {
  HeadingOne = "headingone",
  HeadingTwo = "headingtwo",
  Input = "input",
  Paragraph = "paragraph",
  Select = "select",
  TextArea = "textarea",
  Spacer = "spacer",
  Checkbox = "checkbox",
  Radio = "radio",
  DatePicker = "datepicker",
  FileUpload = "fileupload",
  Signature = "signature",
  Image = "image",
  Divider = "divider",
}

export const SIDEBAR_FIELDS: {
  [key in FormBuilderFieldType]: SidebarComponent;
} = {
  [FormBuilderFieldType.HeadingOne]: {
    title: "Heading 1",
    type: FormBuilderFieldType.HeadingOne,
  },
  [FormBuilderFieldType.HeadingTwo]: {
    title: "Heading 2",
    type: FormBuilderFieldType.HeadingTwo,
  },
  [FormBuilderFieldType.Input]: {
    title: "Text Input",
    type: FormBuilderFieldType.Input,
  },
  [FormBuilderFieldType.Select]: {
    title: "Select",
    type: FormBuilderFieldType.Select,
  },
  [FormBuilderFieldType.Paragraph]: {
    title: "Paragraph",
    type: FormBuilderFieldType.Paragraph,
  },
  [FormBuilderFieldType.TextArea]: {
    title: "Text Area",
    type: FormBuilderFieldType.TextArea,
  },
  [FormBuilderFieldType.Spacer]: {
    title: "Spacer",
    type: FormBuilderFieldType.Spacer,
  },
  [FormBuilderFieldType.Checkbox]: {
    title: "Checkbox",
    type: FormBuilderFieldType.Checkbox,
  },
  [FormBuilderFieldType.Radio]: {
    title: "Radio Button",
    type: FormBuilderFieldType.Radio,
  },
  [FormBuilderFieldType.DatePicker]: {
    title: "Date Picker",
    type: FormBuilderFieldType.DatePicker,
  },
  [FormBuilderFieldType.FileUpload]: {
    title: "File Upload",
    type: FormBuilderFieldType.FileUpload,
  },
  [FormBuilderFieldType.Signature]: {
    title: "Signature",
    type: FormBuilderFieldType.Signature,
  },
  [FormBuilderFieldType.Image]: {
    title: "Image",
    type: FormBuilderFieldType.Image,
  },
  [FormBuilderFieldType.Divider]: {
    title: "Divider",
    type: FormBuilderFieldType.Divider,
  },
};

export enum ConvertDocumentStatus {
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED",
  Error = "ERROR",
}
