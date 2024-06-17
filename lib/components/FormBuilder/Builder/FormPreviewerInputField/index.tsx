import { Form, Input } from 'antd';
import { FormBuilderFieldType } from '../../../../constants/formBuilder';
import { FormPreviewerFieldCommonProps } from '../../../../types/draggableFields.types';

interface Props extends FormPreviewerFieldCommonProps {
  placeholder?: string;
  type: FormBuilderFieldType.Input | FormBuilderFieldType.TextArea;
}

function FormPreviewerInputField({ placeholder, type, ...rest }: Props) {
  return (
    <Form.Item {...rest}>
      {type === FormBuilderFieldType.Input ? (
        <Input placeholder={placeholder} />
      ) : (
        <Input.TextArea placeholder={placeholder} />
      )}
    </Form.Item>
  );
}

export default FormPreviewerInputField;
