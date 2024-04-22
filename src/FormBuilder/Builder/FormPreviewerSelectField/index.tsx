import { Form, Select } from 'antd';
import type { OptionType } from '#/containers/Compliances/Documents/interfaces/draggableFields.types';
import type { FormPreviewerFieldCommonProps } from '#/containers/Compliances/Documents/interfaces/formPreviewer.types';
import { getFormRequiredRule } from '#/containers/Compliances/Documents/utils/form-submit';
import BaseSelect from '#/shared/components/selectors/BaseSelect';

interface Props extends FormPreviewerFieldCommonProps {
  options?: OptionType[];
  placeholder?: string;
}

function FormPreviewerSelectField({
  options,
  placeholder,
  required,
  ...rest
}: Props) {
  return (
    <Form.Item rules={getFormRequiredRule(!!required)} {...rest}>
      <BaseSelect placeholder={placeholder}>
        {options?.map(option => (
          <Select.Option key={option.value} value={option.value}>
            {option.value}
          </Select.Option>
        ))}
      </BaseSelect>
    </Form.Item>
  );
}

export default FormPreviewerSelectField;
