import { Tabs } from 'antd';
import { useState } from 'react';
import FormPreviewerContainer from '../lib/components/FormBuilder/Builder/FormPreviewerContainer';
import { DraggableField } from '../lib/types/draggableFields.types';
import { FormBuilderZone } from '../lib';

function App() {
  const [form, setForm] = useState<DraggableField[]>([]);

  const tabs = [
    {
      label: 'Form Builder',
      children: <FormBuilderZone form={form} setForm={setForm} />,
      key: '0',
    },
    {
      label: 'Preview Form',
      children: (
        <div className="bg-gray-100 h-screen pt-8">
          <FormPreviewerContainer forms={form} isEdit />
        </div>
      ),
      key: '1',
    },
  ];

  return <Tabs defaultActiveKey="0" items={tabs} />;
}

export default App;
