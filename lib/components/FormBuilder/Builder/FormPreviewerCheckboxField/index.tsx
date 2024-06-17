import { Checkbox, Form } from 'antd';
import {
  CheckBoxType,
  FormPreviewerFieldCommonProps,
} from '../../../../types/draggableFields.types';

interface Props extends FormPreviewerFieldCommonProps {
  checkBoxOptions?: CheckBoxType[];
}

function FormPreviewerCheckbox({ checkBoxOptions, ...rest }: Props) {
  return (
    <Form.Item {...rest}>
      <Checkbox.Group
        className="flex flex-col gap-2"
        options={checkBoxOptions}
      />
    </Form.Item>
  );
}

export default FormPreviewerCheckbox;
