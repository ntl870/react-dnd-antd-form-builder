import { useEffect } from 'react';
import type { FormProps } from 'antd';
import { Form } from 'antd';
import type { DraggableField } from '#/containers/Compliances/Documents/interfaces/draggableFields.types';
import FormPreviewer from '../FormPreviewer';

interface Props extends FormProps {
  forms: DraggableField[];
  isEdit?: boolean;
  isFill?: boolean;
}

export default function FormPreviewerContainer({
  forms,
  isEdit,
  initialValues,
  isFill,
  ...restFormProps
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      layout="vertical"
      preserve={false}
      {...restFormProps}
    >
      <FormPreviewer forms={forms} isEdit={isEdit} isFill={isFill} />
    </Form>
  );
}
