import { DraggableField } from '../../../lib/types/draggableFields.types';
import FormBuilderSidebar from '../FormBuilderSidebar';
import FormBuilderContextWrapper from '../../../lib/components/FormBuilderContextWrapper';
import FormBuilderSortableFields from '../../../lib/components/FormBuilderSortableFields';
import { FormBuilderFieldType } from '../../../lib/constants/formBuilder';
import FormBuilderSidebarItem from '../FormBuilderSidebarItem';

interface Props {
  initialValues?: DraggableField[];
  form: DraggableField[];
  setForm: (form: DraggableField[]) => void;
}

const renderOverlay = (type: FormBuilderFieldType) => <FormBuilderSidebarItem type={type} />;

function FormBuilderZone({ initialValues, form, setForm }: Props) {
  return (
    <FormBuilderContextWrapper initialValues={initialValues} onFormChange={setForm} renderOverlay={renderOverlay}>
      <FormBuilderSidebar />
      <FormBuilderSortableFields fields={form} />
    </FormBuilderContextWrapper>
  );
}

export default FormBuilderZone;
