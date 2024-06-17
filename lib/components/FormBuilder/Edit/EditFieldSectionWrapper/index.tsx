import EditDividerFieldSection from '../EditDividerFieldSection';
import { FormBuilderFieldType } from '../../../../constants/formBuilder';
import EditCheckBoxFieldSection from '../EditCheckBoxFieldSection';
import EditFileUploadFieldSection from '../EditFileUploadFieldSection';
import EditImageFieldSection from '../EditImageFieldSection';
import EditInputFieldSection from '../EditInputFieldSection';
import EditRadioFieldSection from '../EditRadioFieldSection';
import EditSelectFieldSection from '../EditSelectFieldSection';
import EditSignatureFieldSection from '../EditSignatureFieldSection';
import EditTextFieldSection from '../EditTextFieldSection';
import EditDatePickerFieldSection from '../EditDatePickerFieldSection';

interface Props {
  children: React.ReactNode;
  isEdit: boolean;
  id?: string;
  type?: FormBuilderFieldType;
}

function EditFieldSectionWrapper({
  children, isEdit, id, type,
}: Props) {
  if (isEdit) {
    switch (type) {
      case FormBuilderFieldType.Input:
      case FormBuilderFieldType.TextArea:
        return <EditInputFieldSection id={id} />;
      case FormBuilderFieldType.Select:
        return <EditSelectFieldSection id={id} />;
      case FormBuilderFieldType.HeadingOne:
      case FormBuilderFieldType.HeadingTwo:
      case FormBuilderFieldType.Paragraph:
        return <EditTextFieldSection id={id} />;
      case FormBuilderFieldType.Checkbox:
        return <EditCheckBoxFieldSection id={id} />;
      case FormBuilderFieldType.Radio:
        return <EditRadioFieldSection id={id} />;
      case FormBuilderFieldType.DatePicker:
        return <EditDatePickerFieldSection id={id} />;
      case FormBuilderFieldType.FileUpload:
        return <EditFileUploadFieldSection id={id} />;
      case FormBuilderFieldType.Signature:
        return <EditSignatureFieldSection id={id} />;
      case FormBuilderFieldType.Image:
        return <EditImageFieldSection id={id} />;
      case FormBuilderFieldType.Divider:
        return <EditDividerFieldSection id={id} />;
      default:
        return null;
    }
  }

  return children;
}

export default EditFieldSectionWrapper;
