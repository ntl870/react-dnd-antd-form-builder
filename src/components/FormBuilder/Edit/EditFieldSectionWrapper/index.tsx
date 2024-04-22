import { lazy } from "react";
import EditDividerFieldSection from "../EditDividerFieldSection";
import { FormBuilderFieldType } from "../../../../constants/formBuilder";

const EditCheckBoxFieldSection = lazy(
  () => import("../EditCheckBoxFieldSection")
);
const EditDatePickerSection = lazy(
  () => import("../EditDatePickerFieldSection")
);
const EditFileUploadFieldSection = lazy(
  () => import("../EditFileUploadFieldSection")
);
const EditImageFieldSection = lazy(() => import("../EditImageFieldSection"));
const EditInputFieldSection = lazy(() => import("../EditInputFieldSection"));
const EditRadioFieldSection = lazy(() => import("../EditRadioFieldSection"));
const EditSelectFieldSection = lazy(() => import("../EditSelectFieldSection"));
const EditSignatureFieldSection = lazy(
  () => import("../EditSignatureFieldSection")
);
const EditTextFieldSection = lazy(() => import("../EditTextFieldSection"));

interface Props {
  children: React.ReactNode;
  isEdit: boolean;
  id?: string;
  type?: FormBuilderFieldType;
}

function EditFieldSectionWrapper({ children, isEdit, id, type }: Props) {
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
        return <EditDatePickerSection id={id} />;
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
