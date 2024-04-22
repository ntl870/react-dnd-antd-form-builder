import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { FormBuilderFieldType } from '#/containers/Compliances/Documents/constants/formBuilder';
import { renderTypeIcon } from '#/containers/Compliances/Documents/utils/tools';

interface Props {
  type: FormBuilderFieldType;
  attributes: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}

function FormBuilderSidebarItem({ type, attributes, listeners }: Props) {
  return (
    <div
      {...listeners}
      {...attributes}
      className="flex flex-col w-full border min-h-[100px] border-solid border-color-border-secondary py-2 px-4 items-center justify-center relative rounded-xl bg-white"
    >
      <div className="flex flex-col items-center justify-center h-full">
        {renderTypeIcon(type)}
      </div>
    </div>
  );
}

export default FormBuilderSidebarItem;
