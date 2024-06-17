import { FormBuilderFieldType } from '../constants/formBuilder';
import {
  DraggableFieldStateType,
  CheckboxFieldEditState,
  InputFieldEditState,
  FileUploadFieldEditState,
  TextFieldEditState,
  ImageFieldEditState,
  RadioFieldEditState,
  SelectFieldEditState,
  SignatureFieldEditState,
  DraggableField,
} from '../types/draggableFields.types';
import FormBuilderCheckbox from '../components/FormBuilder/Builder/FormBuilderCheckbox';
import FormBuilderDatePicker from '../components/FormBuilder/Builder/FormBuilderDatePicker';
import FormBuilderFileUpload from '../components/FormBuilder/Builder/FormBuilderFileUpload';
import FormBuilderImage from '../components/FormBuilder/Builder/FormBuilderImage';
import FormBuilderTextInput from '../components/FormBuilder/Builder/FormBuilderInput';
import FormBuilderRadioButton from '../components/FormBuilder/Builder/FormBuilderRadioButton';
import FormBuilderSelect from '../components/FormBuilder/Builder/FormBuilderSelect';
import FormBuilderSignature from '../components/FormBuilder/Builder/FormBuilderSignature';
import FormBuilderTextField from '../components/FormBuilder/Builder/FormBuilderTextField';
import FormBuilderDivider from '../components/FormBuilder/Builder/FormBuilderDivider';

export const renderers: Record<string, (props: DraggableFieldStateType) => JSX.Element> = {
  checkbox: (props: CheckboxFieldEditState) => <FormBuilderCheckbox {...props} />,
  datepicker: (props: InputFieldEditState) => <FormBuilderDatePicker {...props} />,
  divider: () => <FormBuilderDivider />,
  fileupload: (props: FileUploadFieldEditState) => <FormBuilderFileUpload {...props} />,
  headingone: (props: TextFieldEditState) => <FormBuilderTextField {...props} type={FormBuilderFieldType.HeadingOne} />,
  headingtwo: (props: TextFieldEditState) => <FormBuilderTextField {...props} type={FormBuilderFieldType.HeadingTwo} />,
  image: (props: ImageFieldEditState) => <FormBuilderImage {...props} />,
  input: (props: InputFieldEditState) => <FormBuilderTextInput {...props} />,
  paragraph: (props: TextFieldEditState) => <FormBuilderTextField {...props} type={FormBuilderFieldType.Paragraph} />,
  radio: (props: RadioFieldEditState) => <FormBuilderRadioButton {...props} />,
  select: (props: SelectFieldEditState) => <FormBuilderSelect {...props} />,
  signature: (props: SignatureFieldEditState) => <FormBuilderSignature {...props} />,
  textarea: (props: InputFieldEditState) => <FormBuilderTextInput {...props} isTextArea />,
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

export const getDefaultState = (type: FormBuilderFieldType): DraggableFieldStateType => {
  if (type === FormBuilderFieldType.Input || type === FormBuilderFieldType.TextArea) {
    return {
      isEdit: false,
      placeholder: 'Placeholder',
      required: false,
      title: type === FormBuilderFieldType.Input ? 'Input' : 'Textarea',
    };
  }

  if (type === FormBuilderFieldType.HeadingOne) {
    return {
      content: 'Header1 Title',
      description: 'Header1 Description',
      isEdit: false,
      title: 'Header1',
    };
  }

  if (type === FormBuilderFieldType.HeadingTwo) {
    return {
      content: 'Header2 Title',
      description: 'Header2 Description',
      isEdit: false,
      title: 'Header2',
    };
  }

  if (type === FormBuilderFieldType.Paragraph) {
    return {
      content: 'Paragraph content',
      description: 'Paragraph Description',
      isEdit: false,
      title: 'Paragraph',
    };
  }

  if (type === FormBuilderFieldType.Select) {
    return {
      isEdit: false,
      options: [
        {
          name: 'option1',
          value: 'Option 1',
        },
      ],
      required: false,
      title: 'Select',
      placeholder: 'Select an option',
    };
  }

  if (type === FormBuilderFieldType.Checkbox) {
    return {
      checkBoxOptions: [
        {
          label: 'Option 1',
          value: 'Option 1',
        },
      ],
      isEdit: false,
      required: false,
      title: 'Checkbox',
    };
  }

  if (type === FormBuilderFieldType.Radio) {
    return {
      isEdit: false,
      radioOptions: [
        {
          label: 'Option 1',
          value: 'Option 1',
        },
      ],
      required: false,
      title: 'Radio Button',
    };
  }

  if (type === FormBuilderFieldType.DatePicker) {
    return {
      isEdit: false,
      title: 'Date Picker',
    };
  }

  if (type === FormBuilderFieldType.FileUpload) {
    return {
      isEdit: false,
      title: 'File Upload',
    };
  }

  if (type === FormBuilderFieldType.Signature) {
    return {
      isEdit: false,
      signature: '',
      title: 'Signature',
    };
  }

  if (type === FormBuilderFieldType.Image) {
    return {
      isEdit: false,
      pathFile: '',
      title: 'Image',
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
      return 'Heading one';
    case FormBuilderFieldType.HeadingTwo:
      return 'Heading two';
    case FormBuilderFieldType.Input:
      return 'Input';
    case FormBuilderFieldType.Paragraph:
      return 'Paragraph';
    case FormBuilderFieldType.Select:
      return 'Select';
    case FormBuilderFieldType.TextArea:
      return 'Text area';
    case FormBuilderFieldType.Checkbox:
      return 'Checkbox';
    case FormBuilderFieldType.Radio:
      return 'Radio';
    case FormBuilderFieldType.DatePicker:
      return 'Date picker';
    case FormBuilderFieldType.FileUpload:
      return 'File upload';
    case FormBuilderFieldType.Signature:
      return 'Signature';
    case FormBuilderFieldType.Image:
      return 'Image';
    case FormBuilderFieldType.Divider:
      return 'Divider';
    default:
      return '';
  }
};
