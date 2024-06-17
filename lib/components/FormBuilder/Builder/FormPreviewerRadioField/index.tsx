import { Form, Radio } from 'antd';
import {
  FormPreviewerFieldCommonProps,
  RadioType,
} from '../../../../types/draggableFields.types';

interface Props extends FormPreviewerFieldCommonProps {
  radioOptions?: RadioType[];
}

function FormPreviewerRadioField({ radioOptions, ...rest }: Props) {
  return (
    <Form.Item {...rest}>
      <Radio.Group options={radioOptions} />
    </Form.Item>
  );
}

export default FormPreviewerRadioField;
