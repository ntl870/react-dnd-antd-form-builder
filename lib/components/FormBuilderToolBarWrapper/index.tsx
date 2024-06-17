import { Fragment, ReactNode } from 'react';
import { useFormBuilderContext } from '../../contexts/FormBuilderContext';

interface Props {
  children: ReactNode;
}

export default function FormBuilderToolBarWrapper({ children }: Props) {
  const { sidebarFieldsRegenKey } = useFormBuilderContext();

  return <Fragment key={sidebarFieldsRegenKey}>{children}</Fragment>;
}
