import { useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { SidebarComponent } from '#/containers/Compliances/Documents/interfaces/draggableFields.types';
import { getUUID } from '#/shared/utils/tools';
import FormBuilderSidebarItem from '../FormBuilderSidebarItem';

interface Props {
  field: SidebarComponent;
}

export default function DraggableSidebarField({ field }: Props) {
  const id = useRef(getUUID());

  const { attributes, listeners, setNodeRef } = useDraggable({
    data: {
      field,
      fromSidebar: true,
    },
    id: id.current,
  });

  return (
    <div className="cursor-pointer" ref={setNodeRef}>
      <FormBuilderSidebarItem
        attributes={attributes}
        listeners={listeners}
        type={field.type}
      />
    </div>
  );
}
