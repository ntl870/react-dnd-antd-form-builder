import { Checkbox, Form } from 'antd';
import type { CheckBoxType } from '#/containers/Compliances/Documents/interfaces/draggableFields.types';
import type { FormPreviewerFieldCommonProps } from '#/containers/Compliances/Documents/interfaces/formPreviewer.types';
import { getFormRequiredRule } from '#/containers/Compliances/Documents/utils/form-submit';

interface Props extends FormPreviewerFieldCommonProps {
  checkBoxOptions?: CheckBoxType[];
}

function FormPreviewerCheckbox({ checkBoxOptions, required, ...rest }: Props) {
  return (
    <Form.Item rules={getFormRequiredRule(!!required)} {...rest}>
      <Checkbox.Group
        className="flex flex-col gap-2"
        options={checkBoxOptions}
      />
    </Form.Item>
  );
}

export default FormPreviewerCheckbox;
