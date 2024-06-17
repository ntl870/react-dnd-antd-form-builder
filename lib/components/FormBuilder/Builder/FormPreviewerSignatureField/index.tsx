import { useCallback, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Button, Form, Typography } from 'antd';
import SignatureCanvas from 'react-signature-canvas';
import { Signature } from '../../../../assets';
import { FormPreviewerFieldCommonProps } from '../../../../types/draggableFields.types';
import { twClassMerge } from '../../../../utils/tailwind';

interface Props extends FormPreviewerFieldCommonProps {
  isEdit: boolean;
  isFill?: boolean;
}

function FormPreviewerSignatureField({
  name, isEdit, isFill, ...rest
}: Props) {
  const form = Form.useFormInstance();
  const sigPadRef = useRef<SignatureCanvas | null>(null);
  const value = Form.useWatch(name, form);

  const onClear = useCallback(() => {
    sigPadRef.current?.clear();
    form.setFieldValue(name, '');
  }, [form, name]);

  const onEnd = () => {
    const base64 = sigPadRef.current?.getCanvas().toDataURL();
    form.setFieldValue(name, base64);
  };

  useEffect(() => {
    if (!isEdit) {
      sigPadRef.current?.clear();
      if (value) {
        sigPadRef.current?.fromDataURL(value);
      }
    }
  }, [isEdit, form, value]);

  return (
    <Form.Item
      className={twClassMerge({
        'flex justify-center': isEdit,
      })}
      name={name}
      shouldUpdate
      {...rest}
    >
      {!isEdit && !isFill ? (
        <div className="flex flex-row items-center justify-center border-2 border-solid border-secondary-border rounded-xl mt-2 p-8">
          <img alt="Signature" src={Signature} />
          <Typography.Text className="ml-2">Sign Here</Typography.Text>
        </div>
      ) : (
        <>
          {' '}
          <div className="border-2 rounded-xl border-solid border-secondary-border w-[800px] pr-6">
            <SignatureCanvas
              ref={sigPadRef}
              canvasProps={{
                height: 200,
                width: 800,
              }}
              onEnd={onEnd}
            />
          </div>
          {isEdit ? (
            <div className="flex items-center">
              <Button
                icon={<Icon height={25} icon="solar:restart-linear" width={24} />}
                onClick={onClear}
                type="link"
              />
              <Typography.Text>Clear</Typography.Text>
            </div>
          ) : null}
        </>
      )}
    </Form.Item>
  );
}

export default FormPreviewerSignatureField;
