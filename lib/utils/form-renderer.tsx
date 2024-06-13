import { Suspense, lazy } from "react";
import { Spin } from "antd";

import EditFieldSectionWrapper from "../components/FormBuilder/Edit/EditFieldSectionWrapper";
import { FormBuilderFieldType } from "../constants/formBuilder";
import {
  DraggableFieldStateType,
  CheckboxFieldEditState,
  InputFieldEditState,
  DividerFieldEditState,
  FileUploadFieldEditState,
  TextFieldEditState,
  ImageFieldEditState,
  RadioFieldEditState,
  SelectFieldEditState,
  SignatureFieldEditState,
  DraggableField,
} from "../types/draggableFields.types";

const FormBuilderCheckbox = lazy(
  () => import("../components/FormBuilder/Builder/FormBuilderCheckbox")
);
const FormBuilderDatePicker = lazy(
  () => import("../components/FormBuilder/Builder/FormBuilderDatePicker")
);
const FormBuilderFileUpload = lazy(
  () => import("../components/FormBuilder/Builder/FormBuilderFileUpload")
);
const FormBuilderImage = lazy(
  () => import("../components/FormBuilder/Builder/FormBuilderImage")
);
const FormBuilderTextInput = lazy(
  () => import("../components/FormBuilder/Builder/FormBuilderInput")
);
const FormBuilderRadioButton = lazy(
  () => import("../components/FormBuilder/Builder/FormBuilderRadioButton")
);
const FormBuilderSelect = lazy(
  () => import("../components/FormBuilder/Builder/FormBuilderSelect")
);
const FormBuilderSignature = lazy(
  () => import("../components/FormBuilder/Builder/FormBuilderSignature")
);
const FormBuilderTextField = lazy(
  () => import("../components/FormBuilder/Builder/FormBuilderTextField")
);

const FormBuilderDivider = lazy(
  () => import("../components/FormBuilder/Builder/FormBuilderDivider")
);

export const renderers: Record<
  string,
  (props: DraggableFieldStateType) => JSX.Element
> = {
  checkbox: (props: CheckboxFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.Checkbox}
      >
        <FormBuilderCheckbox {...props} />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
  datepicker: (props: InputFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.DatePicker}
      >
        <FormBuilderDatePicker {...props} />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
  divider: (props: DividerFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.Divider}
      >
        <FormBuilderDivider />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
  fileupload: (props: FileUploadFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.FileUpload}
      >
        <FormBuilderFileUpload title={props.title ?? ""} />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
  headingone: (props: TextFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.HeadingOne}
      >
        <FormBuilderTextField
          {...props}
          type={FormBuilderFieldType.HeadingOne}
        />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
  headingtwo: (props: TextFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.HeadingTwo}
      >
        <FormBuilderTextField
          {...props}
          type={FormBuilderFieldType.HeadingTwo}
        />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
  image: (props: ImageFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.Image}
      >
        <FormBuilderImage {...props} />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
  input: (props: InputFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.Input}
      >
        <FormBuilderTextInput {...props} />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
  paragraph: (props: TextFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.Paragraph}
      >
        <FormBuilderTextField
          {...props}
          type={FormBuilderFieldType.Paragraph}
        />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
  radio: (props: RadioFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.Radio}
      >
        <FormBuilderRadioButton {...props} />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
  select: (props: SelectFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.Select}
      >
        <FormBuilderSelect {...props} />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
  signature: (props: SignatureFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.Signature}
      >
        <FormBuilderSignature {...props} />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
  textarea: (props: InputFieldEditState) => (
    <Suspense fallback={<Spin />}>
      <EditFieldSectionWrapper
        id={props.id}
        isEdit={!!props.isEdit}
        type={FormBuilderFieldType.TextArea}
      >
        <FormBuilderTextInput {...props} isTextArea />
      </EditFieldSectionWrapper>
    </Suspense>
  ),
};

export const getRenderer = (type: FormBuilderFieldType) => {
  if (!Object.values(FormBuilderFieldType).includes(type)) {
    return () => null;
  }

  if (type === FormBuilderFieldType.Spacer) {
    return function () {
      return <div className="w-full opacity-25 h-[150px]" />;
    };
  }

  return renderers[type];
};

export const getDefaultState = (
  type: FormBuilderFieldType
): DraggableFieldStateType => {
  if (
    type === FormBuilderFieldType.Input ||
    type === FormBuilderFieldType.TextArea
  ) {
    return {
      isEdit: false,
      placeholder: "Placeholder",
      required: false,
      title: type === FormBuilderFieldType.Input ? "Input" : "Textarea",
    };
  }

  if (type === FormBuilderFieldType.HeadingOne) {
    return {
      content: "Header1 Title",
      description: "Header1 Description",
      isEdit: false,
      title: "Header1",
    };
  }

  if (type === FormBuilderFieldType.HeadingTwo) {
    return {
      content: "Header2 Title",
      description: "Header2 Description",
      isEdit: false,
      title: "Header2",
    };
  }

  if (type === FormBuilderFieldType.Paragraph) {
    return {
      content: "Paragraph content",
      description: "Paragraph Description",
      isEdit: false,
      title: "Paragraph",
    };
  }

  if (type === FormBuilderFieldType.Select) {
    return {
      isEdit: false,
      options: [
        {
          name: "option1",
          value: "Option 1",
        },
      ],
      required: false,
      title: "Select",
    };
  }

  if (type === FormBuilderFieldType.Checkbox) {
    return {
      checkBoxOptions: [
        {
          label: "Option 1",
          value: "Option 1",
        },
      ],
      isEdit: false,
      required: false,
      title: "Checkbox",
    };
  }

  if (type === FormBuilderFieldType.Radio) {
    return {
      isEdit: false,
      radioOptions: [
        {
          label: "Option 1",
          value: "Option 1",
        },
      ],
      required: false,
      title: "Radio Button",
    };
  }

  if (type === FormBuilderFieldType.DatePicker) {
    return {
      isEdit: false,
      title: "Date Picker",
    };
  }

  if (type === FormBuilderFieldType.FileUpload) {
    return {
      isEdit: false,
      title: "File Upload",
    };
  }

  if (type === FormBuilderFieldType.Signature) {
    return {
      isEdit: false,
      signature: "",
      title: "Signature",
    };
  }

  if (type === FormBuilderFieldType.Image) {
    return {
      isEdit: false,
      pathFile: "",
      title: "Image",
    };
  }

  return {
    isEdit: false,
  };
};

export const formatFormDataToDocumentInput = (fields: DraggableField[]) =>
  fields.map((field) => ({
    ...field,
    state: {
      ...field.state,
      isEdit: undefined,
    },
  }));

export const getDragFieldPlaceholderTitle = (type?: FormBuilderFieldType) => {
  switch (type) {
    case FormBuilderFieldType.HeadingOne:
      return "Heading one";
    case FormBuilderFieldType.HeadingTwo:
      return "Heading two";
    case FormBuilderFieldType.Input:
      return "Input";
    case FormBuilderFieldType.Paragraph:
      return "Paragraph";
    case FormBuilderFieldType.Select:
      return "Select";
    case FormBuilderFieldType.TextArea:
      return "Text area";
    case FormBuilderFieldType.Checkbox:
      return "Checkbox";
    case FormBuilderFieldType.Radio:
      return "Radio";
    case FormBuilderFieldType.DatePicker:
      return "Date picker";
    case FormBuilderFieldType.FileUpload:
      return "File upload";
    case FormBuilderFieldType.Signature:
      return "Signature";
    case FormBuilderFieldType.Image:
      return "Image";
    case FormBuilderFieldType.Divider:
      return "Divider";
    default:
      return "";
  }
};
