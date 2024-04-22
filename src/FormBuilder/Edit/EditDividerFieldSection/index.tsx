import { useContext } from 'react';
import { Typography } from 'antd';
import { FormBuilderContext } from '#/containers/Compliances/Documents/contexts/FormBuilderContext';
import EditFieldSectionToolbar from '../EditFieldSectionToolbar';

interface Props {
  id?: string;
}

function EditDividerFieldSection({ id }: Props) {
  const { onRemoveField } = useContext(FormBuilderContext);

  const onRemoveFormBuilderField = () => {
    if (!id) return;

    onRemoveField(id);
  };

  return (
    <div>
      <Typography.Text>Divider</Typography.Text>
      <EditFieldSectionToolbar
        hideRequiredSwitch
        onRemoveField={onRemoveFormBuilderField}
      />
    </div>
  );
}

export default EditDividerFieldSection;
