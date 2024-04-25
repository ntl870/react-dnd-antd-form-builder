import { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, notification } from "antd";
import FormPreviewer from "../FormPreviewer";
import { DraggableField } from "../../../../types/draggableFields.types";

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

  const onCopyData = () => {
    navigator.clipboard.writeText(JSON.stringify(forms));
    notification.success({
      message: "JSON data copied",
    });
  };

  return (
    <div className="relative">
      <Form
        form={form}
        initialValues={initialValues}
        layout="vertical"
        preserve={false}
        {...restFormProps}
      >
        <FormPreviewer forms={forms} isEdit={isEdit} isFill={isFill} />
      </Form>
      <Button className="block absolute top-0" onClick={onCopyData}>
        Copy JSON data
      </Button>
    </div>
  );
}
