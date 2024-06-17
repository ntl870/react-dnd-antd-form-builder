import { FormBuilderFieldType } from '../constants/formBuilder';
import { DraggableField } from '../types/draggableFields.types';

export const createSpacer = ({ id }: { id: string }): DraggableField => ({
  id,
  name: FormBuilderFieldType.Spacer,
  state: {},
  type: FormBuilderFieldType.Spacer,
});

export const getDuplicateFieldState = (field: DraggableField, highestIndex: number): DraggableField => {
  const newFieldName = `${field.name.slice(0, -1)}${highestIndex + 1}`;

  return {
    ...field,
    id: crypto.randomUUID(),
    name: newFieldName,
    state: {
      ...field.state,
      isEdit: false,
    },
  };
};
