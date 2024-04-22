import { useContext } from 'react';
import { FormBuilderFieldType } from '#/containers/Compliances/Documents/constants/formBuilder';
import { FormBuilderContext } from '#/containers/Compliances/Documents/contexts/FormBuilderContext';
import type { DraggableField } from '#/containers/Compliances/Documents/interfaces/draggableFields.types';
import { getRenderer } from '#/containers/Compliances/Documents/utils/form-renderer';
import DragFieldPlaceholder from '../DragFieldPlaceholder';

interface Props {
  field: DraggableField;
  overlay?: boolean;
  id?: string;
}

export function DragField({ field, overlay, id }: Props) {
  const { currentDragfield } = useContext(FormBuilderContext);

  const { type, state } = field;
  const { isEdit } = field.state;
  const Component = getRenderer(type);

  if (type === FormBuilderFieldType.Spacer && currentDragfield?.id === id) {
    return <DragFieldPlaceholder type={currentDragfield?.type} />;
  }

  return (
    <div
      className={`${!isEdit ? ' pointer-events-none' : ''}${
        overlay ? ' opacity-50' : ''
      }`}
    >
      <Component id={id} {...state} />
    </div>
  );
}
