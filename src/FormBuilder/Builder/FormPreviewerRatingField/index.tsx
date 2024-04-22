import { Form, Rate } from 'antd';
import type { FormPreviewerFieldCommonProps } from '#/containers/Compliances/Documents/interfaces/formPreviewer.types';

interface Props extends FormPreviewerFieldCommonProps {
  ratingValue?: number;
}

function FormPreviewerRatingField({ ratingValue, ...rest }: Props) {
  return (
    <Form.Item {...rest}>
      <Rate value={ratingValue} />
    </Form.Item>
  );
}

export default FormPreviewerRatingField;
