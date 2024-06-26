import { useContext, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import FormBuilderDropzone from '../FormBuilderDropzone';
import SortableField from '../SortableField';
import { FormBuilderContext } from '../../../../contexts/FormBuilderContext';
import useClickOutside from '../../../../hooks/useClickOutside';

export default function CurrentForm() {
  const { fields, onEndEdit } = useContext(FormBuilderContext);
  const outsideRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(outsideRef, onEndEdit);

  const { setNodeRef } = useDroppable({
    data: {
      isContainer: true,
      parent: null,
    },
    id: 'canvas_droppable',
  });

  return (
    <div
      ref={(ref) => {
        setNodeRef(ref);
        outsideRef.current = ref;
      }}
      className="flex-1 mx-16 mt-6 rounded-lg flex flex-col overflow-y-auto gap-y-4 min-w-[720px] mb-12"
    >
      {fields.map((field, i) => (
        <SortableField key={field.id} field={field} index={i} {...field} />
      ))}
      {fields.length === 0 ? <FormBuilderDropzone /> : null}
    </div>
  );
}
