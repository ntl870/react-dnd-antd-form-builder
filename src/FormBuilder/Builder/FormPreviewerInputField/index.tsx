import { Form, Input } from 'antd';
import { FormBuilderFieldType } from '#/containers/Compliances/Documents/constants/formBuilder';
import type { FormPreviewerFieldCommonProps } from '#/containers/Compliances/Documents/interfaces/formPreviewer.types';
import { getFormRequiredRule } from '#/containers/Compliances/Documents/utils/form-submit';

interface Props extends FormPreviewerFieldCommonProps {
  placeholder?: string;
  type: FormBuilderFieldType.Input | FormBuilderFieldType.TextArea;
}

function FormPreviewerInputField({
  placeholder,
  type,
  required,
  ...rest
}: Props) {
  return (
    <Form.Item rules={getFormRequiredRule(!!required)} {...rest}>
      {type === FormBuilderFieldType.Input ? (
        <Input placeholder={placeholder} />
      ) : (
        <Input.TextArea placeholder={placeholder} />
      )}
    </Form.Item>
  );
}

export default FormPreviewerInputField;
