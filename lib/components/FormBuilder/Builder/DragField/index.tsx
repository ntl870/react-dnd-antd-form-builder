import { useContext } from 'react';
import DragFieldPlaceholder from '../DragFieldPlaceholder';
import { FormBuilderFieldType } from '../../../../constants/formBuilder';
import { FormBuilderContext } from '../../../../contexts/FormBuilderContext';
import { DraggableField } from '../../../../types/draggableFields.types';
import { getRenderer } from '../../../../utils/form-renderer';
import EditFieldSectionWrapper from '../../Edit/EditFieldSectionWrapper';
import { twClassMerge } from '../../../../utils/tailwind';

interface Props {
  field: DraggableField;
  overlay?: boolean;
  id?: string;
}

export default function DragField({ field, overlay, id }: Props) {
  const { currentDragfield } = useContext(FormBuilderContext);
  const { type } = field;
  const { isEdit } = field.state;
  const Component = getRenderer(type);

  if (type === FormBuilderFieldType.Spacer && currentDragfield?.id === id) {
    return <DragFieldPlaceholder type={currentDragfield?.type} />;
  }

  return (
    <div
      className={twClassMerge({
        'pointer-events-none': !isEdit,
        'opacity-50': overlay,
      })}
    >
      <EditFieldSectionWrapper id={id} isEdit={!!isEdit} type={type}>
        <Component id={id} />
      </EditFieldSectionWrapper>
    </div>
  );
}
