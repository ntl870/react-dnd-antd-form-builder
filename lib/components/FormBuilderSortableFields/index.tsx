import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableField } from '../../types/draggableFields.types';
import CurrentForm from '../FormBuilder/Builder/CurrentForm';

interface Props {
  fields: DraggableField[];
}

export default function FormBuilderSortableFields({ fields }: Props) {
  return (
    <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
      <CurrentForm />
    </SortableContext>
  );
}
