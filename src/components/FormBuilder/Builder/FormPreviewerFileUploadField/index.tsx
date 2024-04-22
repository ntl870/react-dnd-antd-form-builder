import { Icon } from "@iconify/react";
import { Button, Form, Upload } from "antd";
import { FormPreviewerFieldCommonProps } from "../../../../types/draggableFields.types";

interface Props extends FormPreviewerFieldCommonProps {}

function FormPreviewerFileUploadField({ name, ...rest }: Props) {
  return (
    <Form.Item name={name} {...rest}>
      <Upload beforeUpload={() => false} maxCount={1}>
        <Button
          className="text-sm px-4 py-2"
          icon={<Icon icon="solar:upload-minimalistic-linear" />}
        >
          Upload
        </Button>
      </Upload>
    </Form.Item>
  );
}

export default FormPreviewerFileUploadField;
