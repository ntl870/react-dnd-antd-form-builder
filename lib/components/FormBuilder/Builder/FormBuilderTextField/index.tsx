import { useContext } from 'react';
import { Typography } from 'antd';
import { FormBuilderFieldType } from '../../../../constants/formBuilder';
import { FormBuilderContext } from '../../../../contexts/FormBuilderContext';
import { TextFieldEditState } from '../../../../types/draggableFields.types';

interface Props extends TextFieldEditState {
  type:
    | FormBuilderFieldType.HeadingOne
    | FormBuilderFieldType.HeadingTwo
    | FormBuilderFieldType.Paragraph;
}

function FormBuilderTextField({ type, id }: Props) {
  const { getFieldById } = useContext(FormBuilderContext);
  const currentField = getFieldById(id);

  return (
    <div>
      {type !== FormBuilderFieldType.Paragraph ? (
        <Typography.Title
          className="mt-0 mb-1"
          level={type === FormBuilderFieldType.HeadingOne ? 3 : 4}
        >
          {currentField?.state.title}
        </Typography.Title>
      ) : (
        <Typography.Text className="mb-4 inline-block">
          {currentField?.state.title}
        </Typography.Text>
      )}

      <Typography.Paragraph>
        {currentField?.state.description}
      </Typography.Paragraph>
    </div>
  );
}

export default FormBuilderTextField;
