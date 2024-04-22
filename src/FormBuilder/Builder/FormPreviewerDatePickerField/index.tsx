import { Form } from 'antd';
import type { FormPreviewerFieldCommonProps } from '#/containers/Compliances/Documents/interfaces/formPreviewer.types';
import { getFormRequiredRule } from '#/containers/Compliances/Documents/utils/form-submit';
import BaseDatePicker from '#/shared/components/selectors/BaseDatePicker';

interface Props extends FormPreviewerFieldCommonProps {
  ratingValue?: number;
  placeholder?: string;
}

function FormPreviewerDatePickerField({
  required,
  placeholder,
  ...rest
}: Props) {
  return (
    <Form.Item rules={getFormRequiredRule(!!required)} {...rest}>
      <BaseDatePicker
        className="w-full"
        placeholder={placeholder || 'Select date'}
      />
    </Form.Item>
  );
}

export default FormPreviewerDatePickerField;
