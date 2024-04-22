import { useContext, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { FormBuilderContext } from '#/containers/Compliances/Documents/contexts/FormBuilderContext';
import useClickOutside from '#/shared/hooks/useClickOutside';
import FormBuilderDropzone from '../FormBuilderDropzone';
import SortableField from '../SortableField';

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
      className="flex-1 mx-16 mt-6 rounded-lg flex flex-col overflow-y-auto gap-y-4 min-w-[720px] mb-12"
      ref={ref => {
        setNodeRef(ref);
        outsideRef.current = ref;
      }}
    >
      {fields.map((field, i) => (
        <SortableField field={field} index={i} key={field.id} {...field} />
      ))}
      {fields.length === 0 ? <FormBuilderDropzone /> : null}
    </div>
  );
}
