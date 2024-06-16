/* eslint-disable @typescript-eslint/no-misused-promises */
import { Form, Upload } from "antd";
import { FormPreviewerFieldCommonProps } from "../../../../types/draggableFields.types";

interface Props extends FormPreviewerFieldCommonProps {}

export default function ViewDocumentUploadField({ ...rest }: Props) {
  return (
    <Form.Item className="pointer-events-auto" {...rest}>
      <Upload
        showUploadList={{
          showRemoveIcon: false,
        }}
      />
    </Form.Item>
  );
}
