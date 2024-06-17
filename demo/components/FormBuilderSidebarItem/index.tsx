import { FormBuilderFieldType } from '../../../lib/constants/formBuilder';
import { renderTypeIcon } from '../../utils/render';

interface Props {
  type: FormBuilderFieldType;
}

function FormBuilderSidebarItem({ type }: Props) {
  return (
    <div className="flex flex-col border min-h-[100px] border-solid border-color-border-secondary py-2 px-4 items-center justify-center relative rounded-xl bg-white">
      <div className="flex flex-col items-center justify-center h-full">{renderTypeIcon(type)}</div>
    </div>
  );
}

export default FormBuilderSidebarItem;
