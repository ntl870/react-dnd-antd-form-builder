import { Form, Radio } from 'antd';
import type { RadioType } from '#/containers/Compliances/Documents/interfaces/draggableFields.types';
import type { FormPreviewerFieldCommonProps } from '#/containers/Compliances/Documents/interfaces/formPreviewer.types';
import { getFormRequiredRule } from '#/containers/Compliances/Documents/utils/form-submit';

interface Props extends FormPreviewerFieldCommonProps {
  radioOptions?: RadioType[];
}

function FormPreviewerRadioField({ radioOptions, required, ...rest }: Props) {
  return (
    <Form.Item rules={getFormRequiredRule(!!required)} {...rest}>
      <Radio.Group options={radioOptions} />
    </Form.Item>
  );
}

export default FormPreviewerRadioField;
