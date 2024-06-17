import { Typography } from 'antd';
import {
  Checkbox,
  DatePicker,
  Divider,
  Dropdown,
  Gallery,
  Heading1,
  Heading2,
  Input,
  Paragraph,
  RadioButton,
  Signature,
  Upload,
} from '../../lib/assets';
import { FormBuilderFieldType } from '../../lib/constants/formBuilder';

const renderIcon = (imgSrc: string, text: string, imgClassName?: string) => (
  <>
    <img alt={text} className={imgClassName} src={imgSrc} />
    <Typography.Text className="my-0 text-xs justify-between text-color-text-secondary">{text}</Typography.Text>
  </>
);

export const renderTypeIcon = (type: FormBuilderFieldType) => {
  switch (type) {
    case FormBuilderFieldType.Input:
      return renderIcon(Input, 'Input');
    case FormBuilderFieldType.TextArea:
      return renderIcon(Input, 'Textarea');
    case FormBuilderFieldType.Select:
      return renderIcon(Dropdown, 'Select');
    case FormBuilderFieldType.HeadingOne:
      return renderIcon(Heading1, 'Heading1');
    case FormBuilderFieldType.HeadingTwo:
      return renderIcon(Heading2, 'Heading2');
    case FormBuilderFieldType.Paragraph:
      return renderIcon(Paragraph, 'Paragraph');
    case FormBuilderFieldType.Checkbox:
      return renderIcon(Checkbox, 'Checkbox', 'p-[1.125rem]');
    case FormBuilderFieldType.Radio:
      return renderIcon(RadioButton, 'Radio', 'p-[1.125rem]');
    case FormBuilderFieldType.DatePicker:
      return renderIcon(DatePicker, 'Date picker');
    case FormBuilderFieldType.FileUpload:
      return renderIcon(Upload, 'File Upload');
    case FormBuilderFieldType.Signature:
      return renderIcon(Signature, 'Signature', 'p-[0.875rem]');
    case FormBuilderFieldType.Image:
      return renderIcon(Gallery, 'Image');
    case FormBuilderFieldType.Divider:
      return renderIcon(Divider, 'Divider');
    default:
      return null;
  }
};
