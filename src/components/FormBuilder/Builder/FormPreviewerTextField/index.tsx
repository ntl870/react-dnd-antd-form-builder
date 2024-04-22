import { Typography } from "antd";
import { FormBuilderFieldType } from "../../../../constants/formBuilder";
import { FormPreviewerFieldCommonProps } from "../../../../types/draggableFields.types";

interface Props extends FormPreviewerFieldCommonProps {
  type:
    | FormBuilderFieldType.HeadingOne
    | FormBuilderFieldType.HeadingTwo
    | FormBuilderFieldType.Paragraph;
  title?: string;
  description?: string;
}

const renderTitle = (type: Props["type"], title: string) => {
  if (type === FormBuilderFieldType.HeadingOne) {
    return (
      <Typography.Title className="mt-0 mb-1" level={3}>
        {title}
      </Typography.Title>
    );
  }

  if (type === FormBuilderFieldType.HeadingTwo) {
    return (
      <Typography.Title className="mt-0 mb-1" level={4}>
        {title}
      </Typography.Title>
    );
  }

  return (
    <Typography.Text className="mb-4 inline-block">{title}</Typography.Text>
  );
};

function FormPreviewerTextField({ type, title, description }: Props) {
  return (
    <div className="py-4">
      {renderTitle(type, title ?? "")}
      <Typography.Paragraph className="mb-0">
        {description}
      </Typography.Paragraph>
    </div>
  );
}

export default FormPreviewerTextField;
