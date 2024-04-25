import { DatePicker, Form } from "antd";
import { FormPreviewerFieldCommonProps } from "../../../../types/draggableFields.types";

interface Props extends FormPreviewerFieldCommonProps {
  ratingValue?: number;
  placeholder?: string;
}

function FormPreviewerDatePickerField({ placeholder, ...rest }: Props) {
  return (
    <Form.Item {...rest}>
      <DatePicker
        className="w-full"
        placeholder={placeholder || "Select date"}
      />
    </Form.Item>
  );
}

export default FormPreviewerDatePickerField;
