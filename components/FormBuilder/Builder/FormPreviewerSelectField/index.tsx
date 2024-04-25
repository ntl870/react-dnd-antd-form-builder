import { Form, Select } from "antd";
import {
  FormPreviewerFieldCommonProps,
  OptionType,
} from "../../../../types/draggableFields.types";

interface Props extends FormPreviewerFieldCommonProps {
  options?: OptionType[];
  placeholder?: string;
}

function FormPreviewerSelectField({ options, placeholder, ...rest }: Props) {
  return (
    <Form.Item {...rest}>
      <Select placeholder={placeholder}>
        {options?.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.value}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}

export default FormPreviewerSelectField;
