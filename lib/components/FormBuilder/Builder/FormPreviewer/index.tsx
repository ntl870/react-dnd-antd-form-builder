import { Suspense, lazy } from 'react';
import { Form, Spin } from 'antd';
import FormPreviewerDividerField from '../FormPreviewerDividerField';
import ViewDocumentUploadField from '../FormPreviewerFileUploadField/ViewDocumentUploadField';
import { FormBuilderFieldType } from '../../../../constants/formBuilder';
import { DraggableField } from '../../../../types/draggableFields.types';
import { twClassMerge } from '../../../../utils/tailwind';

const FormPreviewerCheckbox = lazy(
  () => import('../FormPreviewerCheckboxField'),
);
const FormPreviewerDatePickerField = lazy(
  () => import('../FormPreviewerDatePickerField'),
);
const FormPreviewerFileUploadField = lazy(
  () => import('../FormPreviewerFileUploadField'),
);
const FormPreviewerImageField = lazy(
  () => import('../FormPreviewerImageField'),
);
const FormPreviewerInputField = lazy(
  () => import('../FormPreviewerInputField'),
);
const FormPreviewerRadioField = lazy(
  () => import('../FormPreviewerRadioField'),
);
const FormPreviewerSelectField = lazy(
  () => import('../FormPreviewerSelectField'),
);
const FormPreviewerSignatureField = lazy(
  () => import('../FormPreviewerSignatureField'),
);
const FormPreviewerTextField = lazy(() => import('../FormPreviewerTextField'));

interface Props {
  forms: DraggableField[];
  isEdit?: boolean;
  isFill?: boolean;
}

function FormPreviewer({ forms, isEdit, isFill }: Props) {
  return (
    <div
      className={twClassMerge(
        'max-w-[1000px] self-center m-auto bg-white opacity-100 p-8 mt-4 rounded-xl',
        {
          'pointer-events-none': !isEdit,
        },
      )}
    >
      {forms.map((form) => {
        if (
          form.type === FormBuilderFieldType.Input
          || form.type === FormBuilderFieldType.TextArea
        ) {
          return (
            <Suspense key={form.id} fallback={<Spin />}>
              <FormPreviewerInputField
                key={form.id}
                label={form.state.title}
                name={form.name}
                placeholder={form.state.placeholder}
                required={form.state.required}
                type={form.type}
              />
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.Select) {
          return (
            <Suspense key={form.id} fallback={<Spin />}>
              <FormPreviewerSelectField
                key={form.id}
                label={form.state.title}
                name={form.name}
                options={form.state.options}
                placeholder={form.state.title}
                required={form.state.required}
              />
            </Suspense>
          );
        }

        if (
          form.type === FormBuilderFieldType.HeadingOne
          || form.type === FormBuilderFieldType.HeadingTwo
          || form.type === FormBuilderFieldType.Paragraph
        ) {
          return (
            <Suspense key={form.id} fallback={<Spin />}>
              <FormPreviewerTextField
                key={form.id}
                description={form.state.description}
                title={form.state.title}
                type={form.type}
              />
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.Checkbox) {
          return (
            <Suspense key={form.id} fallback={<Spin />}>
              <FormPreviewerCheckbox
                key={form.id}
                checkBoxOptions={form.state.checkBoxOptions}
                label={form.state.title}
                name={form.name}
                required={form.state.required}
              />
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.Radio) {
          return (
            <Suspense key={form.id} fallback={<Spin />}>
              <FormPreviewerRadioField
                key={form.id}
                label={form.state.title}
                name={form.name}
                radioOptions={form.state.radioOptions}
                required={form.state.required}
              />
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.DatePicker) {
          return (
            <Suspense key={form.id} fallback={<Spin />}>
              <FormPreviewerDatePickerField
                key={form.id}
                label={form.state.title}
                name={form.name}
                placeholder={form.state.placeholder}
                required={form.state.required}
              />
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.Image) {
          return (
            <Suspense key={form.id} fallback={<Spin />}>
              <FormPreviewerImageField key={form.id} src="" />
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.FileUpload) {
          return (
            <Suspense key={form.id} fallback={<Spin />}>
              <Form.Item shouldUpdate>
                {({ getFieldValue }) => (!isEdit && getFieldValue(form.name) ? (
                  <ViewDocumentUploadField
                    label={form.state.title}
                    name={form.name}
                  />
                ) : (
                  <FormPreviewerFileUploadField
                    label={form.state.title}
                    name={form.name}
                    required={form.state.required}
                  />
                ))}
              </Form.Item>
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.Signature) {
          return (
            <Suspense key={form.id} fallback={<Spin />}>
              <Form.Item shouldUpdate>
                {() => (
                  <FormPreviewerSignatureField
                    key={form.id}
                    isEdit={!!isEdit}
                    isFill={isFill}
                    label={form.state.title}
                    name={form.name}
                    required={form.state.required}
                  />
                )}
              </Form.Item>
            </Suspense>
          );
        }

        if (form.type === FormBuilderFieldType.Divider) {
          return <FormPreviewerDividerField key={form.id} />;
        }

        return null;
      })}
    </div>
  );
}

export default FormPreviewer;
