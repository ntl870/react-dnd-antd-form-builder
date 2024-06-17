import { Col, Row, Typography } from 'antd';
import DraggableSidebarField from '../../../lib/components/FormBuilder/Builder/DraggableSidebarField';
import { FormBuilderFieldType } from '../../../lib/constants/formBuilder';
import FormBuilderToolBarWrapper from '../../../lib/components/FormBuilderToolBarWrapper';
import FormBuilderSidebarItem from '../FormBuilderSidebarItem';

export default function FormBuilderSidebar() {
  return (
    <FormBuilderToolBarWrapper>
      <div className="bg-white w-64 min-h-screen p-4">
        <div className="text-base font-medium mb-2">Elements</div>
        <div className="mb-4">
          <Typography.Text className="text-xs text-color-text inline-block mb-2">Text</Typography.Text>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.HeadingOne}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.HeadingOne} />
              </DraggableSidebarField>
            </Col>
            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.HeadingTwo}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.HeadingTwo} />
              </DraggableSidebarField>
            </Col>
            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.Paragraph}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.Paragraph} />
              </DraggableSidebarField>
            </Col>
          </Row>
        </div>
        <div className="mb-4">
          <Typography.Text className="text-xs text-color-text inline-block mb-2">Inputs</Typography.Text>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.Input}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.Input} />
              </DraggableSidebarField>
            </Col>
            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.TextArea}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.TextArea} />
              </DraggableSidebarField>
            </Col>
          </Row>
        </div>
        <div className="mb-4">
          <Typography.Text className="text-xs text-color-text inline-block mb-2">Selectors</Typography.Text>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.DatePicker}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.DatePicker} />
              </DraggableSidebarField>
            </Col>

            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.Checkbox}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.Checkbox} />
              </DraggableSidebarField>
            </Col>

            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.Radio}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.Radio} />
              </DraggableSidebarField>
            </Col>
            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.Select}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.Select} />
              </DraggableSidebarField>
            </Col>
          </Row>
        </div>
        <div>
          <Typography.Text className="text-xs text-color-text inline-block mb-2">Others</Typography.Text>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.Divider}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.Divider} />
              </DraggableSidebarField>
            </Col>

            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.FileUpload}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.FileUpload} />
              </DraggableSidebarField>
            </Col>

            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.Image}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.Image} />
              </DraggableSidebarField>
            </Col>

            <Col span={12}>
              <DraggableSidebarField type={FormBuilderFieldType.Signature}>
                <FormBuilderSidebarItem type={FormBuilderFieldType.Signature} />
              </DraggableSidebarField>
            </Col>
          </Row>
        </div>
      </div>
    </FormBuilderToolBarWrapper>
  );
}
