import { Col, Row, Typography } from "antd";
import {
  SIDEBAR_FIELDS,
  FormBuilderFieldType,
} from "../../constants/formBuilder";
import DraggableSidebarField from "../FormBuilder/Builder/DraggableSidebarField";

interface Props {
  fieldsRegKey: string;
}

export default function FormBuilderSidebar({ fieldsRegKey }: Props) {
  return (
    <div className="bg-white w-64 min-h-screen p-4" key={fieldsRegKey}>
      <div className="text-base font-medium mb-2">Elements</div>
      <div className="mb-4">
        <Typography.Text className="text-xs text-color-text inline-block mb-2">
          Text
        </Typography.Text>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.HeadingOne]}
            />
          </Col>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.HeadingTwo]}
            />
          </Col>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.Paragraph]}
            />
          </Col>
        </Row>
      </div>
      <div className="mb-4">
        <Typography.Text className="text-xs text-color-text inline-block mb-2">
          Inputs
        </Typography.Text>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.Input]}
            />
          </Col>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.TextArea]}
            />
          </Col>
        </Row>
      </div>
      <div className="mb-4">
        <Typography.Text className="text-xs text-color-text inline-block mb-2">
          Selectors
        </Typography.Text>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.DatePicker]}
            />
          </Col>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.Checkbox]}
            />
          </Col>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.Radio]}
            />
          </Col>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.Select]}
            />
          </Col>
        </Row>
      </div>
      <div>
        <Typography.Text className="text-xs text-color-text inline-block mb-2">
          Others
        </Typography.Text>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.Divider]}
            />
          </Col>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.FileUpload]}
            />
          </Col>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.Image]}
            />
          </Col>
          <Col span={12}>
            <DraggableSidebarField
              field={SIDEBAR_FIELDS[FormBuilderFieldType.Signature]}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
